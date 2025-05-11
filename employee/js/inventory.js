// Inventory Management JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // DOM Elements
    const searchInput = document.getElementById("searchInventory");
    const inventoryFilter = document.getElementById("inventoryFilter");
    const inventoryTable = document.getElementById("inventoryTable");
    const stockModal = document.getElementById("stockModal");
    const stockForm = document.getElementById("stockForm");
    const cancelStockBtn = document.getElementById("cancelStockBtn");
    const closeModal = document.querySelector(".close-modal");
    const logoutBtn = document.getElementById("logoutBtn");

    // Inventory data (in a real application, this would come from a database)
    let inventory = [
        {
            id: "P001",
            name: "Pain Relief Tablets",
            category: "Over-the-Counter",
            currentStock: 145,
            minStock: 50,
            expiryDate: "2025-06-15",
            status: "Normal",
        },
        {
            id: "P002",
            name: "Antibiotics",
            category: "Prescription Medicines",
            currentStock: 78,
            minStock: 50,
            expiryDate: "2025-03-10",
            status: "Normal",
        },
        {
            id: "P003",
            name: "Vitamin C Supplements",
            category: "Wellness & Vitamins",
            currentStock: 25,
            minStock: 30,
            expiryDate: "2025-08-22",
            status: "Low Stock",
        },
        {
            id: "P004",
            name: "First Aid Kit",
            category: "Healthcare Products",
            currentStock: 15,
            minStock: 20,
            expiryDate: "2026-01-30",
            status: "Low Stock",
        },
        {
            id: "P005",
            name: "Allergy Relief Tablets",
            category: "Over-the-Counter",
            currentStock: 0,
            minStock: 25,
            expiryDate: "2025-04-18",
            status: "Out of Stock",
        },
        {
            id: "P006",
            name: "Cold & Flu Syrup",
            category: "Over-the-Counter",
            currentStock: 42,
            minStock: 30,
            expiryDate: "2024-06-05",
            status: "Expiring Soon",
        },
    ];

    // Handle logout
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("employeeLoggedIn");
        localStorage.removeItem("employeeUsername");
        window.location.href = "login.html";
    });

    // Close modal
    function closeStockModal() {
        stockModal.style.display = "none";
    }

    closeModal.addEventListener("click", closeStockModal);
    cancelStockBtn.addEventListener("click", closeStockModal);

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === stockModal) {
            closeStockModal();
        }
    });

    // Handle stock update form submission
    stockForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const productId = document.getElementById("productId").value;
        const stockChange = parseInt(
            document.getElementById("stockChange").value
        );

        // Find the product in inventory
        const productIndex = inventory.findIndex(
            (item) => item.id === productId
        );

        if (productIndex !== -1) {
            // Update stock
            const newStock = inventory[productIndex].currentStock + stockChange;

            // Ensure stock doesn't go below 0
            inventory[productIndex].currentStock = Math.max(0, newStock);

            // Update status based on new stock level
            updateProductStatus(productIndex);

            // Update table and close modal
            renderInventoryTable();
            closeStockModal();

            // Show success message
            alert("Stock updated successfully!");
        }
    });

    // Update product status based on stock level and expiry date
    function updateProductStatus(index) {
        const product = inventory[index];
        const currentDate = new Date();
        const expiryDate = new Date(product.expiryDate);

        // Check if product is expiring within 30 days
        const daysUntilExpiry = Math.floor(
            (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (product.currentStock === 0) {
            product.status = "Out of Stock";
        } else if (daysUntilExpiry <= 30) {
            product.status = "Expiring Soon";
        } else if (product.currentStock < product.minStock) {
            product.status = "Low Stock";
        } else {
            product.status = "Normal";
        }
    }

    // Handle update stock button clicks
    function setupUpdateButtons() {
        const updateButtons = document.querySelectorAll(".edit-btn");
        updateButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const product = inventory[index];

                // Fill form with product data
                document.getElementById("productId").value = product.id;
                document.getElementById("productName").value = product.name;
                document.getElementById("currentStock").value =
                    product.currentStock;
                document.getElementById("stockChange").value = "";

                // Show modal
                stockModal.style.display = "block";
            });
        });
    }

    // Search and filter functionality
    searchInput.addEventListener("input", filterInventory);
    inventoryFilter.addEventListener("change", filterInventory);

    function filterInventory() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = inventoryFilter.value;

        let filteredInventory = inventory.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm) ||
                item.id.toLowerCase().includes(searchTerm)
        );

        // Apply status filter
        if (filterValue !== "all") {
            filteredInventory = filteredInventory.filter((item) => {
                if (filterValue === "low") return item.status === "Low Stock";
                if (filterValue === "out")
                    return item.status === "Out of Stock";
                if (filterValue === "expiring")
                    return item.status === "Expiring Soon";
                return true;
            });
        }

        renderInventoryTable(filteredInventory);
    }

    // Render inventory table
    function renderInventoryTable(inventoryToRender = inventory) {
        const tableBody = inventoryTable.querySelector("tbody");
        tableBody.innerHTML = "";

        inventoryToRender.forEach((item) => {
            const row = document.createElement("tr");

            // Add class based on status
            if (item.status === "Low Stock") row.classList.add("low-stock");
            if (item.status === "Out of Stock")
                row.classList.add("out-of-stock");
            if (item.status === "Expiring Soon")
                row.classList.add("expiring-soon");

            // Get status class
            let statusClass = "status-normal";
            if (item.status === "Low Stock" || item.status === "Expiring Soon")
                statusClass = "status-warning";
            if (item.status === "Out of Stock") statusClass = "status-danger";

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.currentStock}</td>
                <td>${item.minStock}</td>
                <td>${item.expiryDate}</td>
                <td><span class="${statusClass}">${item.status}</span></td>
                <td>
                    <button class="action-btn edit-btn">Update Stock</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Setup update buttons
        setupUpdateButtons();
    }

    // Initial render
    renderInventoryTable();
});
