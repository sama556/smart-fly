// Reusable Cart (Static) - Include on any page with header/cart dropdown markup

(function() {
    const staticCartItems = [
        {
            id: 1,
            flightNumber: 'SV1234',
            departure: { airport: 'RUH' },
            arrival: { airport: 'JED' },
            seat: '12A',
            price: 299,
            type: 'manual'
        }
    ];

    function getCartItems() {
        // Always use static data for this requirement
        return staticCartItems;
    }

    function updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (!badge) return;
        badge.textContent = getCartItems().length;
    }

    function renderCart() {
        const listEl = document.getElementById('cartList');
        const footerEl = document.getElementById('cartFooter');
        const totalEl = document.getElementById('cartTotal');
        if (!listEl || !footerEl) return;
        const items = getCartItems();
        if (!items.length) {
            listEl.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><p style="font-size: 0.9rem; margin-top: 10px;">Add some flights to get started!</p></div>';
            footerEl.style.display = 'none';
            return;
        }
        let total = 0;
        listEl.innerHTML = items.map(it => {
            total += Number(it.price) || 0;
            return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title"><i class="fas fa-plane"></i> ${it.flightNumber} - ${it.seat || '-'}</div>
                    <div class="cart-item-sub">${it.departure.airport} → ${it.arrival.airport}</div>
                </div>
                <div class="cart-item-price">${it.price} SAR</div>
            </div>`;
        }).join('');
        if (totalEl) totalEl.textContent = `${total} SAR`;
        footerEl.style.display = 'block';
    }

    function toggleCart() {
        const cartDropdown = document.getElementById('cartDropdown');
        if (!cartDropdown) return;
        const show = cartDropdown.style.display !== 'block';
        cartDropdown.style.display = show ? 'block' : 'none';
        if (show) renderCart();
    }

    function proceedToCheckout() {
        // Use the last static item as current booking
        const items = getCartItems();
        if (!items.length) return;
        const current = items[items.length - 1];
        const bookingData = {
            flightNumber: current.flightNumber,
            seat: current.seat || null,
            price: current.price,
            type: current.type,
            timestamp: new Date().toISOString()
        };
        try { localStorage.setItem('currentBooking', JSON.stringify(bookingData)); } catch(_) {}
        window.location.href = 'booking-confirmation.html';
    }

    function initCart() {
        updateCartBadge();
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.addEventListener('click', toggleCart);
        }
        const checkoutBtn = document.querySelector('.cart-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', proceedToCheckout);
        }
    }

    document.addEventListener('DOMContentLoaded', initCart);

    // Expose minimal API
    window.cartWidget = { renderCart, updateCartBadge, proceedToCheckout, toggleCart };
})();


