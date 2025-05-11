// Supplier Management JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // DOM Elements
    const searchInput = document.getElementById("searchSuppliers");
    const suppliersTable = document.getElementById("suppliersTable");
    const addSupplierBtn = document.getElementById("addSupplierBtn");
    const supplierModal = document.getElementById("supplierModal");
    const modalTitle = document.getElementById("modalTitle");
    const supplierForm = document.getElementById("supplierForm");
    const cancelSupplierBtn = document.getElementById("cancelSupplierBtn");
    const closeModal = document.querySelector(".close-modal");
    const logoutBtn = document.getElementById("logoutBtn");

    // Supplier data (in a real application, this would come from a database)
    let suppliers = [
        {
            id: "S001",
            name: "MediSupply Inc.",
            contactPerson: "Kamal Hossam",
            phone: "(555) 234-5678",
            email: "kamhossam@medisupply.com",
        },
        {
            id: "S002",
            name: "HealthCare Distributors",
            contactPerson: "Adham Mohamed",
            phone: "(555) 345-6789",
            email: "adhammo@hcdist.com",
        },
        {
            id: "S003",
            name: "Pharma Wholesale Ltd.",
            contactPerson: "Ziad Ahmed",
            phone: "(555) 456-7890",
            email: "ziadziad@pharmawholesale.com",
        },
    ];

    // Handle logout
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("employeeLoggedIn");
        localStorage.removeItem("employeeUsername");
        window.location.href = "login.html";
    });

    // Open modal to add new supplier
    addSupplierBtn.addEventListener("click", () => {
        modalTitle.textContent = "Add New Supplier";
        supplierForm.reset();
        // Generate a new supplier ID
        const newId = "S" + String(suppliers.length + 1).padStart(3, "0");
        document.getElementById("supplierId").value = newId;
        supplierModal.style.display = "block";
    });

    // Close modal
    function closeSupplierModal() {
        supplierModal.style.display = "none";
    }

    closeModal.addEventListener("click", closeSupplierModal);
    cancelSupplierBtn.addEventListener("click", closeSupplierModal);

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === supplierModal) {
            closeSupplierModal();
        }
    });

    // Handle form submission
    supplierForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const supplierId = document.getElementById("supplierId").value;
        const supplierName = document.getElementById("supplierName").value;
        const contactPerson = document.getElementById("contactPerson").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;

        // Check if editing existing supplier or adding new one
        const existingSupplierIndex = suppliers.findIndex(
            (s) => s.id === supplierId
        );

        if (existingSupplierIndex !== -1) {
            // Update existing supplier
            suppliers[existingSupplierIndex] = {
                id: supplierId,
                name: supplierName,
                contactPerson: contactPerson,
                phone: phoneNumber,
                email: emailAddress,
            };
        } else {
            // Add new supplier
            suppliers.push({
                id: supplierId,
                name: supplierName,
                contactPerson: contactPerson,
                phone: phoneNumber,
                email: emailAddress,
            });
        }

        // Update table and close modal
        renderSuppliersTable();
        closeSupplierModal();

        // Show success message
        alert(
            `Supplier ${
                existingSupplierIndex !== -1 ? "updated" : "added"
            } successfully!`
        );
    });

    // Handle edit button clicks
    function setupEditButtons() {
        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const supplier = suppliers[index];

                // Fill form with supplier data
                document.getElementById("supplierId").value = supplier.id;
                document.getElementById("supplierName").value = supplier.name;
                document.getElementById("contactPerson").value =
                    supplier.contactPerson;
                document.getElementById("phoneNumber").value = supplier.phone;
                document.getElementById("emailAddress").value = supplier.email;

                // Update modal title and show modal
                modalTitle.textContent = "Edit Supplier";
                supplierModal.style.display = "block";
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
                        `Are you sure you want to delete ${suppliers[index].name}?`
                    )
                ) {
                    suppliers.splice(index, 1);
                    renderSuppliersTable();
                    alert("Supplier deleted successfully!");
                }
            });
        });
    }

    // Search functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSuppliers = suppliers.filter(
            (supplier) =>
                supplier.name.toLowerCase().includes(searchTerm) ||
                supplier.contactPerson.toLowerCase().includes(searchTerm) ||
                supplier.email.toLowerCase().includes(searchTerm) ||
                supplier.id.toLowerCase().includes(searchTerm)
        );

        renderSuppliersTable(filteredSuppliers);
    });

    // Render suppliers table
    function renderSuppliersTable(suppliersToRender = suppliers) {
        const tableBody = suppliersTable.querySelector("tbody");
        tableBody.innerHTML = "";

        suppliersToRender.forEach((supplier) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.contactPerson}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email}</td>
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
    renderSuppliersTable();
});
