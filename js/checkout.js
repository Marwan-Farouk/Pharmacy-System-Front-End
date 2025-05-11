// checkout.js: Handles displaying and clearing the cart on the checkout page

document.addEventListener("DOMContentLoaded", function () {
    // Load cart from localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItemsDiv = document.getElementById("cartItems");
        cartItemsDiv.innerHTML = "";
        let subtotal = 0;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item) => {
                subtotal += item.price * (item.quantity || 1);
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-qty">Qty: ${
                        item.quantity || 1
                    }</span>
                    <span class="cart-item-price">$${(
                        item.price * (item.quantity || 1)
                    ).toFixed(2)}</span>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
        }
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(
            2
        )}`;
        // Example: flat shipping $5 if subtotal > 0
        const shipping = subtotal > 0 ? 5 : 0;
        document.getElementById("shipping").textContent = `$${shipping.toFixed(
            2
        )}`;
        document.getElementById("total").textContent = `$${(
            subtotal + shipping
        ).toFixed(2)}`;
    }

    // Clear cart function
    function clearCart() {
        localStorage.removeItem("cart");
        loadCart();
    }

    // Show order success popup
    function showOrderPopup() {
        const popup = document.getElementById("orderPopup");
        popup.classList.add("show");
    }

    // Hide order success popup
    function hideOrderPopup() {
        const popup = document.getElementById("orderPopup");
        popup.classList.remove("show");
    }

    // Attach clear cart button
    document
        .getElementById("clearCartBtn")
        .addEventListener("click", clearCart);

    // Close popup and redirect to products page
    document
        .getElementById("orderPopupClose")
        .addEventListener("click", function () {
            hideOrderPopup();
            window.location.href = "products.html";
        });

    // Clear cart on form submit
    document
        .getElementById("checkoutForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            clearCart();
            showOrderPopup();
            this.reset();
        });

    // Initial load
    loadCart();
});
