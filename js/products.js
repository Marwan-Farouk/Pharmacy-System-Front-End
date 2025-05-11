// Products page JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Sample products data
    const products = [
        {
            name: "Pain Relief Tablets",
            price: 12.99,
            category: "otc",
            description: "Fast-acting pain relief medication",
            image: "assets/images/pain-relief.jpg",
        },
        {
            name: "Antibiotics",
            price: 25.99,
            category: "prescription",
            description: "Prescription antibiotics",
            image: "assets/images/antibiotics.jpg",
        },
        {
            name: "Vitamin C Supplements",
            price: 15.99,
            category: "wellness",
            description: "Immune system support",
            image: "assets/images/vitamin-c.jpg",
        },
        {
            name: "First Aid Kit",
            price: 29.99,
            category: "healthcare",
            description: "Complete emergency care kit",
            image: "assets/images/first-aid.jpg",
        },
    ];

    // DOM elements
    const productsGrid = document.querySelector(".products-grid");
    const searchInput = document.getElementById("searchInput");
    const priceRange = document.getElementById("priceRange");
    const categoryCheckboxes = document.querySelectorAll(
        '.filter-group input[type="checkbox"]'
    );

    // Function to create product card
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">$${product.price}</span>
            <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        return card;
    }

    // Function to filter products
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const maxPrice = parseInt(priceRange.value);
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        const filteredProducts = products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
            const matchesPrice = product.price <= maxPrice;
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            return matchesSearch && matchesPrice && matchesCategory;
        });

        displayProducts(filteredProducts);
    }

    // Function to display products
    function displayProducts(productsToShow) {
        productsGrid.innerHTML = "";
        productsToShow.forEach((product) => {
            productsGrid.appendChild(createProductCard(product));
        });
    }

    // Event listeners
    searchInput.addEventListener("input", filterProducts);
    priceRange.addEventListener("input", filterProducts);
    categoryCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", filterProducts);
    });

    // Cart functionality
    window.addToCart = function (name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            name: name,
            price: price,
            quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show popup notification
        const popup = document.getElementById("cartPopup");
        popup.classList.add("show");

        // Hide popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3000);
    };

    // Initialize products display
    displayProducts(products);
});
