// Product Management JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // DOM Elements
    const searchInput = document.getElementById("searchProducts");
    const productsTable = document.getElementById("productsTable");
    const addProductBtn = document.getElementById("addProductBtn");
    const productModal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const productForm = document.getElementById("productForm");
    const cancelProductBtn = document.getElementById("cancelProductBtn");
    const closeModal = document.querySelector(".close-modal");
    const logoutBtn = document.getElementById("logoutBtn");

    // Product data (in a real application, this would come from a database)
    let products = [
        {
            id: "P001",
            name: "Pain Relief Tablets",
            category: "Over-the-Counter",
            price: 12.99,
            stock: 145,
        },
        {
            id: "P002",
            name: "Antibiotics",
            category: "Prescription Medicines",
            price: 25.99,
            stock: 78,
        },
        {
            id: "P003",
            name: "Vitamin C Supplements",
            category: "Wellness & Vitamins",
            price: 15.99,
            stock: 210,
        },
        {
            id: "P004",
            name: "First Aid Kit",
            category: "Healthcare Products",
            price: 29.99,
            stock: 35,
        },
        {
            id: "P005",
            name: "Allergy Relief Tablets",
            category: "Over-the-Counter",
            price: 18.5,
            stock: 92,
        },
    ];

    // Handle logout
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("employeeLoggedIn");
        localStorage.removeItem("employeeUsername");
        window.location.href = "login.html";
    });

    // Open modal to add new product
    addProductBtn.addEventListener("click", () => {
        modalTitle.textContent = "Add New Product";
        productForm.reset();
        // Generate a new product ID
        const newId = "P" + String(products.length + 1).padStart(3, "0");
        document.getElementById("productId").value = newId;
        productModal.style.display = "block";
    });

    // Close modal
    function closeProductModal() {
        productModal.style.display = "none";
    }

    closeModal.addEventListener("click", closeProductModal);
    cancelProductBtn.addEventListener("click", closeProductModal);

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Handle form submission
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const productId = document.getElementById("productId").value;
        const productName = document.getElementById("productName").value;
        const productCategory = document.getElementById("productCategory");
        const categoryText =
            productCategory.options[productCategory.selectedIndex].text;
        const productPrice = parseFloat(
            document.getElementById("productPrice").value
        );
        const productStock = parseInt(
            document.getElementById("productStock").value
        );

        // Check if editing existing product or adding new one
        const existingProductIndex = products.findIndex(
            (p) => p.id === productId
        );

        if (existingProductIndex !== -1) {
            // Update existing product
            products[existingProductIndex] = {
                id: productId,
                name: productName,
                category: categoryText,
                price: productPrice,
                stock: productStock,
            };
        } else {
            // Add new product
            products.push({
                id: productId,
                name: productName,
                category: categoryText,
                price: productPrice,
                stock: productStock,
            });
        }

        // Update table and close modal
        renderProductsTable();
        closeProductModal();

        // Show success message
        alert(
            `Product ${
                existingProductIndex !== -1 ? "updated" : "added"
            } successfully!`
        );
    });

    // Handle edit button clicks
    function setupEditButtons() {
        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const product = products[index];

                // Fill form with product data
                document.getElementById("productId").value = product.id;
                document.getElementById("productName").value = product.name;

                // Set category dropdown
                const categorySelect =
                    document.getElementById("productCategory");
                for (let i = 0; i < categorySelect.options.length; i++) {
                    if (categorySelect.options[i].text === product.category) {
                        categorySelect.selectedIndex = i;
                        break;
                    }
                }

                document.getElementById("productPrice").value = product.price;
                document.getElementById("productStock").value = product.stock;

                // Update modal title and show modal
                modalTitle.textContent = "Edit Product";
                productModal.style.display = "block";
            });
        });
    }

    // Handle delete button clicks
    function setupDeleteButtons() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                if (
                    confirm(
                        `Are you sure you want to delete ${products[index].name}?`
                    )
                ) {
                    products.splice(index, 1);
                    renderProductsTable();
                    alert("Product deleted successfully!");
                }
            });
        });
    }

    // Search functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.id.toLowerCase().includes(searchTerm)
        );

        renderProductsTable(filteredProducts);
    });

    // Render products table
    function renderProductsTable(productsToRender = products) {
        const tableBody = productsTable.querySelector("tbody");
        tableBody.innerHTML = "";

        productsToRender.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Setup edit and delete buttons
        setupEditButtons();
        setupDeleteButtons();
    }

    // Initial render
    renderProductsTable();
});
