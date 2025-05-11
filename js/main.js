// Main JavaScript file for the home page

document.addEventListener('DOMContentLoaded', () => {
    // Sample featured products data
    // const featuredProducts = [
    //     {
    //         name: 'Pain Relief Tablets',
    //         price: 12.99,
    //         description: 'Fast-acting pain relief medication',
    //         image: 'assets/images/pain-relief.jpg'
    //     },
    //     {
    //         name: 'Vitamin C Supplements',
    //         price: 15.99,
    //         description: 'Immune system support',
    //         image: 'assets/images/vitamin-c.jpg'
    //     },
    //     {
    //         name: 'First Aid Kit',
    //         price: 29.99,
    //         description: 'Complete emergency care kit',
    //         image: 'assets/images/first-aid.jpg'
    //     }
    // ];

    // // Function to create product cards
    // function createProductCard(product) {
    //     const card = document.createElement('div');
    //     card.className = 'product-card';
    //     card.innerHTML = `
    //         <img src="${product.image}" alt="${product.name}">
    //         <h3>${product.name}</h3>
    //         <p>${product.description}</p>
    //         <span class="price">$${product.price}</span>
    //         <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    //     `;
    //     return card;
    // }

    // // Function to display featured products
    // function displayFeaturedProducts() {
    //     const productGrid = document.querySelector('.product-grid');
    //     if (productGrid) {
    //         featuredProducts.forEach(product => {
    //             productGrid.appendChild(createProductCard(product));
    //         });
    //     }
    // }

    // // Initialize featured products
    // displayFeaturedProducts();

    // Cart functionality
    window.addToCart = function(name, price) {
        // Get existing cart items from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add new item
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show confirmation message
        alert('Item added to cart!');
    };
});