// Sales Tracking JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // DOM Elements
    const searchInput = document.getElementById("searchOrders");
    const dateFrom = document.getElementById("dateFrom");
    const dateTo = document.getElementById("dateTo");
    const applyDateFilter = document.getElementById("applyDateFilter");
    const salesTable = document.getElementById("salesTable");
    const orderModal = document.getElementById("orderModal");
    const closeModal = document.querySelector(".close-modal");
    const logoutBtn = document.getElementById("logoutBtn");

    // Order data (in a real application, this would come from a database)
    const orders = [
        {
            id: "ORD-12345",
            date: "2024-05-01 09:15",
            customer: "Yousef Reda",
            items: [
                {
                    product: "Pain Relief Tablets",
                    price: 12.99,
                    quantity: 2,
                    subtotal: 25.98,
                },
                {
                    product: "Vitamin C Supplements",
                    price: 15.99,
                    quantity: 1,
                    subtotal: 15.99,
                },
                {
                    product: "First Aid Kit",
                    price: 29.99,
                    quantity: 1,
                    subtotal: 29.99,
                },
            ],
            total: 78.5,
            paymentMethod: "Credit Card",
            status: "Completed",
        },
        {
            id: "ORD-12346",
            date: "2024-05-01 10:30",
            customer: "Mostafa Rabea",
            items: [
                {
                    product: "Antibiotics",
                    price: 25.99,
                    quantity: 1,
                    subtotal: 25.99,
                },
                {
                    product: "Cold & Flu Syrup",
                    price: 19.99,
                    quantity: 1,
                    subtotal: 19.99,
                },
            ],
            total: 45.99,
            paymentMethod: "Cash",
            status: "Completed",
        },
        {
            id: "ORD-12347",
            date: "2024-05-01 11:45",
            customer: "Yassin Karem",
            items: [
                {
                    product: "Vitamin C Supplements",
                    price: 15.99,
                    quantity: 2,
                    subtotal: 31.98,
                },
                {
                    product: "Allergy Relief Tablets",
                    price: 18.5,
                    quantity: 2,
                    subtotal: 37.0,
                },
                {
                    product: "Pain Relief Tablets",
                    price: 12.99,
                    quantity: 3,
                    subtotal: 38.97,
                },
                {
                    product: "First Aid Kit",
                    price: 29.99,
                    quantity: 0.5,
                    subtotal: 14.99,
                },
                {
                    product: "Cold & Flu Syrup",
                    price: 19.99,
                    quantity: 0.5,
                    subtotal: 9.99,
                },
            ],
            total: 124.75,
            paymentMethod: "Credit Card",
            status: "Completed",
        },
        {
            id: "ORD-12348",
            date: "2024-05-01 13:20",
            customer: "Mahmoud Ismail",
            items: [
                {
                    product: "Antibiotics",
                    price: 25.99,
                    quantity: 1,
                    subtotal: 25.99,
                },
            ],
            total: 25.99,
            paymentMethod: "Cash",
            status: "Completed",
        },
        {
            id: "ORD-12349",
            date: "2024-05-01 14:10",
            customer: "Mazen Mohamed",
            items: [
                {
                    product: "Pain Relief Tablets",
                    price: 12.99,
                    quantity: 1,
                    subtotal: 12.99,
                },
                {
                    product: "Vitamin C Supplements",
                    price: 15.99,
                    quantity: 2,
                    subtotal: 31.98,
                },
                {
                    product: "Cold & Flu Syrup",
                    price: 19.99,
                    quantity: 1,
                    subtotal: 19.99,
                },
                {
                    product: "Allergy Relief Tablets",
                    price: 18.5,
                    quantity: 1.5,
                    subtotal: 27.75,
                },
            ],
            total: 92.45,
            paymentMethod: "Credit Card",
            status: "Completed",
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
    function closeOrderModal() {
        orderModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    closeModal.addEventListener("click", closeOrderModal);

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });

    // Handle view order details
    function setupViewButtons() {
        const viewButtons = document.querySelectorAll(".view-btn");
        viewButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const order = orders[index];

                // Fill order details
                document.getElementById("orderIdDetail").textContent = order.id;
                document.getElementById("orderDateDetail").textContent =
                    order.date;
                document.getElementById("customerNameDetail").textContent =
                    order.customer;
                document.getElementById("paymentMethodDetail").textContent =
                    order.paymentMethod;
                document.getElementById(
                    "orderTotalDetail"
                ).textContent = `$${order.total.toFixed(2)}`;

                // Fill order items
                const orderItemsDetail =
                    document.getElementById("orderItemsDetail");
                orderItemsDetail.innerHTML = "";

                order.items.forEach((item) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.product}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.subtotal.toFixed(2)}</td>
                    `;
                    orderItemsDetail.appendChild(row);
                });

                // Show modal
                orderModal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
            });
        });
    }

    // Search functionality
    searchInput.addEventListener("input", filterOrders);

    // Date filter functionality
    applyDateFilter.addEventListener("click", filterOrders);

    function filterOrders() {
        const searchTerm = searchInput.value.toLowerCase();
        const fromDate = dateFrom.value ? new Date(dateFrom.value) : null;
        const toDate = dateTo.value ? new Date(dateTo.value) : null;

        const filteredOrders = orders.filter((order) => {
            // Search filter
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm) ||
                order.customer.toLowerCase().includes(searchTerm) ||
                order.paymentMethod.toLowerCase().includes(searchTerm);

            // Date filter
            let matchesDate = true;
            if (fromDate || toDate) {
                const orderDate = new Date(order.date.split(" ")[0]);

                if (fromDate && toDate) {
                    matchesDate = orderDate >= fromDate && orderDate <= toDate;
                } else if (fromDate) {
                    matchesDate = orderDate >= fromDate;
                } else if (toDate) {
                    matchesDate = orderDate <= toDate;
                }
            }

            return matchesSearch && matchesDate;
        });

        renderOrdersTable(filteredOrders);
    }

    // Render orders table
    function renderOrdersTable(ordersToRender = orders) {
        const tableBody = salesTable.querySelector("tbody");
        tableBody.innerHTML = "";

        ordersToRender.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.customer}</td>
                <td>${order.items.length}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${order.paymentMethod}</td>
                <td><span class="status-success">${order.status}</span></td>
                <td>
                    <button class="action-btn view-btn">View Details</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Setup view buttons
        setupViewButtons();
    }

    // Set default date values (current month)
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    dateFrom.valueAsDate = firstDay;
    dateTo.valueAsDate = today;

    // Initial render
    renderOrdersTable();
});
