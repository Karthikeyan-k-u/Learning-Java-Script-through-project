// contact us.js

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
    // FEEDBACK FORM VALIDATION
    // -----------------------------
    const feedbackForm = document.querySelector(".feedback-form form");
    
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Get form fields
            const feedback = document.getElementById("feedback").value.trim();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            
            // Validate feedback (required)
            if (feedback === "") {
                alert("Please provide your feedback before submitting.");
                return;
            }
            
            // Validate feedback length
            if (feedback.length < 10) {
                alert("Feedback must be at least 10 characters long.");
                return;
            }
            
            // Validate email if provided
            if (email !== "") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    alert("Please enter a valid email address.");
                    return;
                }
            }
            
            // If all validations pass
            alert("Thank you for your valuable feedback! Your response has been saved successfully.");
            feedbackForm.reset();
        });
        
        // Clear form confirmation
        const resetButton = feedbackForm.querySelector("input[type='reset']");
        if (resetButton) {
            resetButton.addEventListener("click", function (event) {
                if (feedbackForm.querySelector("textarea, input") && 
                    (document.getElementById("feedback").value.trim() !== "" || 
                     document.getElementById("name").value.trim() !== "" || 
                     document.getElementById("email").value.trim() !== "")) {
                    
                    const confirmReset = confirm("Are you sure you want to clear all form fields?");
                    if (!confirmReset) {
                        event.preventDefault();
                    }
                }
            });
        }
    }

    // -----------------------------
    // CONTACT LINKS TRACKING
    // -----------------------------
    const contactLinks = document.querySelectorAll(".phone-numbers a, .social-media a, .location-email a");
    
    contactLinks.forEach(link => {
        link.addEventListener("click", function () {
            const linkType = this.getAttribute("href").includes("tel:") ? "Phone" :
                            this.getAttribute("href").includes("whatsapp") ? "WhatsApp" :
                            this.getAttribute("href").includes("instagram") ? "Instagram" :
                            this.getAttribute("href").includes("maps") ? "Location" :
                            this.getAttribute("href").includes("mailto:") ? "Email" : "Other";
            
            console.log(`Contact link clicked: ${linkType}`);
            // You can add analytics tracking here if needed
        });
    });

    // -----------------------------
    // COPY ADDRESS TO CLIPBOARD
    // -----------------------------
    const addressCard = document.querySelector(".address-card");
    
    if (addressCard) {
        addressCard.addEventListener("dblclick", function () {
            const addressText = this.querySelector("p").innerText.replace(/<br>/g, "\n");
            
            // Create temporary textarea to copy text
            const textarea = document.createElement("textarea");
            textarea.value = addressText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            
            // Show brief notification
            const notification = document.createElement("div");
            notification.textContent = "Address copied to clipboard!";
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    }

    // -----------------------------
    // ADD SLIDE-IN ANIMATION STYLE
    // -----------------------------
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .dropdown-content.show {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // -----------------------------
    // OPERATING HOURS HIGHLIGHT
    // -----------------------------
    const hoursParagraphs = document.querySelectorAll(".hours-content p");
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    hoursParagraphs.forEach((p, index) => {
        if (index === 0 && today >= 1 && today <= 5) { // Monday-Friday
            p.style.backgroundColor = "#e8f5e8";
            p.style.borderLeft = "4px solid #4CAF50";
            p.style.paddingLeft = "10px";
        } else if (index === 1 && today === 6) { // Saturday
            p.style.backgroundColor = "#e8f5e8";
            p.style.borderLeft = "4px solid #4CAF50";
            p.style.paddingLeft = "10px";
        } else if (index === 2 && today === 0) { // Sunday
            p.style.backgroundColor = "#e8f5e8";
            p.style.borderLeft = "4px solid #4CAF50";
            p.style.paddingLeft = "10px";
        } else if (index === 3) { // Emergency Services (always highlight)
            p.style.backgroundColor = "#fff3e0";
            p.style.borderLeft = "4px solid #ff9800";
            p.style.paddingLeft = "10px";
        }
    });

    // -----------------------------
    // SCROLL TO TOP BUTTON (Optional enhancement)
    // -----------------------------
    const scrollButton = document.createElement("button");
    scrollButton.innerHTML = "↑";
    scrollButton.setAttribute("aria-label", "Scroll to top");
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #8B0000;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 24px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = "block";
            scrollButton.style.opacity = "1";
        } else {
            scrollButton.style.opacity = "0";
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollButton.style.display = "none";
                }
            }, 300);
        }
    });

    scrollButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    scrollButton.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#B22222";
        this.style.transform = "scale(1.1)";
    });

    scrollButton.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "#8B0000";
        this.style.transform = "scale(1)";
    });

    // -----------------------------
    // ADD HOVER EFFECTS TO CONTACT CARDS
    // -----------------------------
    const contactCards = document.querySelectorAll(".address-card, .phone-numbers, .social-media, .location-email");
    
    contactCards.forEach(card => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)";
            this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            this.style.transition = "all 0.3s ease";
        });
        
        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        });
    });

});