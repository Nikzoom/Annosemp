let currentCategory = 'all';
let currentSort = 'new';

function renderCatalog() {
    const container = document.getElementById('catalog-grid');
    if (!container) return;

    const items = getProductsByCategory(currentCategory);

    if (currentSort === 'price_asc') items.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price_desc') items.sort((a, b) => b.price - a.price);

    container.innerHTML = items.map((product) => createProductCard(product)).join('');
    initRevealAnimations();
}

function updateCatalogSortLabels(sortSelect) {
    const optionKeyMap = {
        new: 'catalog.sort.new',
        price_asc: 'catalog.sort.price_asc',
        price_desc: 'catalog.sort.price_desc',
    };

    Array.from(sortSelect.options).forEach((option) => {
        option.textContent = t(optionKeyMap[option.value] || option.value);
    });
}

function initCatalogFilters() {
    document.querySelectorAll('.catalog-filter__btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            document.querySelectorAll('.catalog-filter__btn').forEach((filterButton) => filterButton.classList.remove('active'));
            btn.classList.add('active');
            renderCatalog();
        });
    });

    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
        updateCatalogSortLabels(sortSelect);
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            renderCatalog();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('catalog-grid')) {
        initCatalogFilters();
        renderCatalog();
    }
});

function renderProductPage() {
    const container = document.getElementById('product-detail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = getProduct(productId);

    if (!product) {
        container.innerHTML = `<p style="text-align:center;padding:100px 0;">${t('product.notFound')}</p>`;
        return;
    }

    const lang = localStorage.getItem('annosemp-lang') || 'ru';
    const name = escapeHtml(getLocalizedField(product.name));
    const desc = escapeHtml(getLocalizedField(product.description));
    const specs = product.specs[lang] || product.specs.ru;

    document.title = `${name} - Annosemp`;

    container.innerHTML = `
        <div class="product-gallery">
            <div class="product-gallery__main">
                <img id="main-product-img" src="${product.images[0]}" alt="${name}">
            </div>
            ${product.images.length > 1 ? `
            <div class="product-gallery__thumbs">
                ${product.images.map((img, index) => `
                    <div class="product-gallery__thumb ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                        <img src="${img}" alt="${name} ${index + 1}">
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        <div class="product-info">
            <span class="product-info__category text-uppercase">${getCategoryLabel(product.category)}</span>
            <h1 class="product-info__name">${name}</h1>
            <div class="product-info__price">
                ${product.oldPrice ? `<span class="product-info__price--old">${formatPrice(product.oldPrice)}</span>` : ''}
                <span>${formatPrice(product.price)}</span>
            </div>
            <div class="divider"></div>
            <p class="product-info__desc">${desc}</p>
            ${product.sizes.length > 0 ? `
            <div class="product-info__option">
                <label class="product-info__label" data-i18n="product.size">${t('product.size')}</label>
                <div class="size-selector" id="size-selector">
                    ${product.sizes.map((size, index) => `<button class="size-btn ${index === 0 ? 'active' : ''}" data-size="${size}" onclick="selectSize(this)">${size}</button>`).join('')}
                </div>
            </div>
            ` : ''}
            ${product.colors.length > 0 ? `
            <div class="product-info__option">
                <label class="product-info__label" data-i18n="product.color">${t('product.color')}</label>
                <div class="color-selector" id="color-selector">
                    ${product.colors.map((color, index) => `<button class="color-btn ${index === 0 ? 'active' : ''}" data-color="${escapeHtml(getLocalizedField(color.name))}" onclick="selectColor(this)" style="background:${color.hex};" title="${escapeHtml(getLocalizedField(color.name))}"></button>`).join('')}
                </div>
            </div>
            ` : ''}
            <button class="btn btn--primary btn--full btn--lg" onclick="addToCartFromPage(${product.id})" data-i18n="product.addToCart">${t('product.addToCart')}</button>
            <div class="product-info__specs">
                <h3 class="product-info__specs-title" data-i18n="product.specs">${t('product.specs')}</h3>
                <ul class="product-info__specs-list">
                    ${specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function changeMainImage(src, thumb) {
    document.getElementById('main-product-img').src = src;
    document.querySelectorAll('.product-gallery__thumb').forEach((thumbnail) => thumbnail.classList.remove('active'));
    thumb.classList.add('active');
}

function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
}

function selectColor(btn) {
    document.querySelectorAll('.color-btn').forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
}

function addToCartFromPage(productId) {
    const sizeBtn = document.querySelector('.size-btn.active');
    const colorBtn = document.querySelector('.color-btn.active');
    const size = sizeBtn ? sizeBtn.dataset.size : 'Universal';
    const color = colorBtn ? colorBtn.dataset.color : 'Default';
    Cart.add(productId, size, color, 1);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-detail')) {
        renderProductPage();
    }
});
