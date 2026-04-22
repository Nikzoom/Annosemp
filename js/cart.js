const Cart = {
    KEY: 'annosemp-cart',

    getItems() {
        try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
        catch { return []; }
    },

    save(items) {
        localStorage.setItem(this.KEY, JSON.stringify(items));
        this.updateUI();
    },

    add(productId, size, color, qty = 1) {
        const items = this.getItems();
        const existing = items.find(i => i.productId === productId && i.size === size && i.color === color);
        if (existing) {
            existing.qty += qty;
        } else {
            items.push({ productId, size, color, qty });
        }
        this.save(items);
        this.showToast();
    },

    remove(index) {
        const items = this.getItems();
        items.splice(index, 1);
        this.save(items);
    },

    updateQty(index, qty) {
        const items = this.getItems();
        if (qty <= 0) { items.splice(index, 1); }
        else { items[index].qty = qty; }
        this.save(items);
    },

    clear() {
        localStorage.removeItem(this.KEY);
        this.updateUI();
    },

    getCount() {
        return this.getItems().reduce((sum, i) => sum + i.qty, 0);
    },

    getTotal() {
        return this.getItems().reduce((sum, item) => {
            const product = getProduct(item.productId);
            return sum + (product ? product.price * item.qty : 0);
        }, 0);
    },

    updateUI() {
        document.querySelectorAll('.header__cart-count').forEach(el => {
            const count = this.getCount();
            el.textContent = count;
            el.classList.toggle('visible', count > 0);
        });

        this.renderMiniCart();

        if (document.getElementById('cart-page-items')) {
            this.renderCartPage();
        }
    },

    showToast() {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = t('product.added');
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 2500);
    },

    renderMiniCart() {
        const container = document.getElementById('mini-cart-items');
        const totalEl = document.getElementById('mini-cart-total');
        const emptyEl = document.getElementById('mini-cart-empty');
        const footerEl = document.getElementById('mini-cart-footer');
        if (!container) return;

        const items = this.getItems();
        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyEl) emptyEl.style.display = 'block';
            if (footerEl) footerEl.style.display = 'none';
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';
        if (footerEl) footerEl.style.display = 'block';

        container.innerHTML = items.map((item, idx) => {
            const product = getProduct(item.productId);
            if (!product) return '';
            return `
                <div class="mini-cart__item">
                    <div class="mini-cart__item-img">
                        <img src="${product.images[0]}" alt="${getLocalizedField(product.name)}">
                    </div>
                    <div class="mini-cart__item-info">
                        <div class="mini-cart__item-name">${getLocalizedField(product.name)}</div>
                        <div class="mini-cart__item-price">${formatPrice(product.price)} × ${item.qty}</div>
                    </div>
                    <button class="mini-cart__item-remove" onclick="Cart.remove(${idx})">×</button>
                </div>
            `;
        }).join('');

        if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
    },

    renderCartPage() {
        const container = document.getElementById('cart-page-items');
        const summaryTotal = document.getElementById('cart-summary-total');
        const summarySubtotal = document.getElementById('cart-summary-subtotal');
        const emptyState = document.getElementById('cart-empty');
        const filledState = document.getElementById('cart-filled');
        if (!container) return;

        const items = this.getItems();

        if (items.length === 0) {
            if (emptyState) emptyState.style.display = 'flex';
            if (filledState) filledState.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (filledState) filledState.style.display = 'grid';

        container.innerHTML = items.map((item, idx) => {
            const product = getProduct(item.productId);
            if (!product) return '';
            return `
                <div class="cart-item">
                    <div class="cart-item__image">
                        <img src="${product.images[0]}" alt="${getLocalizedField(product.name)}">
                    </div>
                    <div class="cart-item__details">
                        <h4 class="cart-item__name">${getLocalizedField(product.name)}</h4>
                        <p class="cart-item__meta">${item.size} / ${item.color}</p>
                        <p class="cart-item__price-mobile">${formatPrice(product.price)}</p>
                    </div>
                    <div class="cart-item__price">${formatPrice(product.price)}</div>
                    <div class="cart-item__qty">
                        <button class="qty-btn" onclick="Cart.updateQty(${idx}, ${item.qty - 1})">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="Cart.updateQty(${idx}, ${item.qty + 1})">+</button>
                    </div>
                    <div class="cart-item__total">${formatPrice(product.price * item.qty)}</div>
                    <button class="cart-item__remove" onclick="Cart.remove(${idx})">×</button>
                </div>
            `;
        }).join('');

        const total = this.getTotal();
        if (summarySubtotal) summarySubtotal.textContent = formatPrice(total);
        if (summaryTotal) summaryTotal.textContent = formatPrice(total);
    }
};
