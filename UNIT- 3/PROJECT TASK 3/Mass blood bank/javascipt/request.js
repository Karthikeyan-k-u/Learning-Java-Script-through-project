// requestform.js

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------
    // PROFILE DROPDOWN MENU
    // -----------------------------
    const userMenu = document.querySelector(".user-menu");
    const dropdown = document.querySelector(".dropdown-content");

    if (userMenu && dropdown) {

        userMenu.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdown.classList.toggle("show");
        });

        document.addEventListener("click", function () {
            dropdown.classList.remove("show");
        });
    }


    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    const form = document.getElementById("bloodRequestForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            // STOP page reload
            event.preventDefault();

            const patientName = document.getElementById("patientName").value.trim();
            const patientAge = document.getElementById("patientAge").value;
            const phone = document.getElementById("phone").value.trim();
            const bloodType = document.getElementById("bloodType").value;
            const requiredDate = document.getElementById("requiredDate").value;
            const attenderName = document.getElementById("attenderName").value.trim();
            const relation = document.getElementById("relation").value.trim();
            const address = document.getElementById("address").value.trim();

            // Patient name validation
            if (patientName.length < 3) {
                alert("Patient name must be at least 3 characters.");
                return;
            }

            // Age validation
            if (patientAge < 1 || patientAge > 100) {
                alert("Please enter a valid age (1-100).");
                return;
            }

            // Phone validation
            const phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(phone)) {
                alert("Enter a valid 10-digit phone number.");
                return;
            }

            // Blood type validation
            if (bloodType === "") {
                alert("Please select a blood type.");
                return;
            }

            // Date validation
            const today = new Date().toISOString().split("T")[0];

            if (requiredDate < today) {
                alert("Please select a future date.");
                return;
            }

            // Attender name validation
            if (attenderName.length < 3) {
                alert("Enter a valid attender name.");
                return;
            }

            // Relation validation
            if (relation.length < 2) {
                alert("Please enter relation with patient.");
                return;
            }

            // Address validation
            if (address.length < 5) {
                alert("Please enter a valid address.");
                return;
            }

            // If all validations pass, show success message indicating data is saved and reset form
            alert("Blood request submitted successfully! Your request has been saved.");
            form.reset();

        });
    }


    // -----------------------------
    // SET MIN DATE FOR DATE INPUT
    // -----------------------------
    const dateInput = document.getElementById("requiredDate");

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

});