document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initHeader();
    initLangSwitch();
    initRevealAnimations();
    initMiniCart();
    initImageLazyLoad();
    Cart.updateUI();
    applyTranslations();
});

function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    setTimeout(() => {
        requestAnimationFrame(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 700);
        });
    }, 1000);
}

function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    const updateHeader = () => {
        header.classList.toggle('scrolled', lastScrollY > 50);
        ticking = false;
    };

    // Keep scroll updates inside RAF.
    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    updateHeader();

    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (burger && mobileNav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

function initLangSwitch() {
    const lang = localStorage.getItem('annosemp-lang') || 'ru';
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.addEventListener('click', () => {
            localStorage.setItem('annosemp-lang', btn.dataset.lang);
            document.querySelectorAll('.lang-switch__btn').forEach(b => b.classList.toggle('active', b.dataset.lang === btn.dataset.lang));
            applyTranslations();
            renderFeaturedProducts();
            const sortSelect = document.getElementById('catalog-sort');
            if (sortSelect && typeof updateCatalogSortLabels === 'function') {
                updateCatalogSortLabels(sortSelect);
            }
            if (typeof renderCatalog === 'function') renderCatalog();
            if (typeof renderProductPage === 'function') renderProductPage();
            Cart.updateUI();
        });
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = val;
        } else {
            el.textContent = val;
        }
    });
}

function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveals.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        // Apply reveal classes in one paint cycle.
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 700);
                }
            });
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

function initImageLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) return;

    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    images.forEach(img => imgObserver.observe(img));
}

function initMiniCart() {
    const cartBtn = document.querySelector('.header__cart');
    const miniCart = document.querySelector('.mini-cart');
    if (!cartBtn || !miniCart) return;

    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        miniCart.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!miniCart.contains(e.target) && !cartBtn.contains(e.target)) {
            miniCart.classList.remove('active');
        }
    });
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = getFeaturedProducts();
    // Build cards off-DOM first.
    const fragment = document.createDocumentFragment();
    const temp = document.createElement('div');
    temp.innerHTML = featured.map(product => createProductCard(product)).join('');

    while (temp.firstChild) {
        fragment.appendChild(temp.firstChild);
    }

    container.innerHTML = '';
    container.appendChild(fragment);

    requestAnimationFrame(() => initRevealAnimations());
}

function createProductCard(product) {
    const name = escapeHtml(getLocalizedField(product.name));
    const badge = product.badge ? escapeHtml(getLocalizedField(product.badge)) : '';

    return `
        <a href="product.html?id=${product.id}" class="product-card reveal">
            <div class="product-card__image">
                <img src="${product.images[0]}" alt="${name}" loading="lazy">
                ${badge ? `<span class="product-card__badge">${badge}</span>` : ''}
                <div class="product-card__quick" data-i18n="collection.quick">${t('collection.quick')}</div>
            </div>
            <div class="product-card__info">
                <h3 class="product-card__name">${name}</h3>
                <div class="product-card__price">
                    ${product.oldPrice ? `<span class="product-card__price--old">${formatPrice(product.oldPrice)}</span>` : ''}
                    ${formatPrice(product.price)}
                </div>
            </div>
        </a>
    `;
}

if (document.getElementById('featured-products')) {
    document.addEventListener('DOMContentLoaded', renderFeaturedProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    const pt = document.querySelector('.page-transition');
    if (pt) {
        pt.addEventListener('animationend', () => {
            if (pt.parentNode) pt.parentNode.removeChild(pt);
        });
    }
});
