// Mass Blood Bank - Interactive Enhancements (Debug Version)
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    console.log('DOM fully loaded and parsed');

    // ---------- 1. USER DROPDOWN TOGGLE ----------
    const userAvatar = document.querySelector('.user-avatar');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (userAvatar && dropdownContent) {
        console.log('Dropdown elements found');
        userAvatar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
            console.log('Dropdown toggled, show class:', dropdownContent.classList.contains('show'));
        });

        document.addEventListener('click', function(event) {
            if (!userAvatar.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    } else {
        console.warn('Dropdown elements missing:', { userAvatar, dropdownContent });
    }

    // ---------- 2. HOSPITAL SEARCH FILTER ----------
    const hospitalSection = document.querySelector('.hospitals-section');
    const hospitalGrid = document.querySelector('.hospital-grid');

    if (hospitalSection && hospitalGrid) {
        console.log('Hospital section found');

        // Create search input only if it doesn't already exist
        if (!document.querySelector('.hospital-search')) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'hospital-search';
            searchContainer.style.margin = '20px 0';
            searchContainer.style.textAlign = 'center';

            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = '🔍 Search hospitals by name or location...';
            searchInput.style.padding = '10px';
            searchInput.style.width = '80%';
            searchInput.style.maxWidth = '500px';
            searchInput.style.border = '1px solid #ccc';
            searchInput.style.borderRadius = '5px';
            searchInput.style.fontSize = '16px';

            searchContainer.appendChild(searchInput);
            hospitalSection.insertBefore(searchContainer, hospitalGrid);
            console.log('Search input added');

            // Filter function
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const cards = document.querySelectorAll('.hospital-card');
                let visibleCount = 0;

                cards.forEach(card => {
                    const nameEl = card.querySelector('.hospital-info h4 a');
                    const locationEl = card.querySelector('.hospital-info p');
                    const name = nameEl ? nameEl.textContent.toLowerCase() : '';
                    const location = locationEl ? locationEl.textContent.toLowerCase() : '';

                    if (name.includes(query) || location.includes(query)) {
                        card.style.display = '';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Show/hide no results message
                let noResultsMsg = document.querySelector('.no-results-message');
                if (visibleCount === 0) {
                    if (!noResultsMsg) {
                        noResultsMsg = document.createElement('p');
                        noResultsMsg.className = 'no-results-message';
                        noResultsMsg.textContent = 'No hospitals match your search.';
                        noResultsMsg.style.textAlign = 'center';
                        noResultsMsg.style.color = '#666';
                        noResultsMsg.style.padding = '20px';
                        hospitalGrid.parentNode.insertBefore(noResultsMsg, hospitalGrid.nextSibling);
                    }
                } else {
                    if (noResultsMsg) noResultsMsg.remove();
                }
            });
        }
    } else {
        console.warn('Hospital section missing:', { hospitalSection, hospitalGrid });
    }

    // ---------- 3. BACK TO TOP BUTTON ----------
    if (!document.querySelector('.back-to-top')) {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '30px';
        backToTop.style.right = '30px';
        backToTop.style.padding = '12px 18px';
        backToTop.style.fontSize = '20px';
        backToTop.style.backgroundColor = '#e53e3e';
        backToTop.style.color = '#fff';
        backToTop.style.border = 'none';
        backToTop.style.borderRadius = '50%';
        backToTop.style.cursor = 'pointer';
        backToTop.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        backToTop.style.display = 'none';
        backToTop.style.zIndex = '1000';
        backToTop.style.transition = 'opacity 0.3s';

        document.body.appendChild(backToTop);
        console.log('Back to top button added');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- 4. SMOOTH SCROLL FOR ANCHOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add minimal CSS for dropdown (if not already present)
    if (!document.querySelector('#dropdown-style')) {
        const style = document.createElement('style');
        style.id = 'dropdown-style';
        style.textContent = `
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #fff;
                min-width: 160px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                z-index: 1;
            }
            .dropdown-content.show {
                display: block;
            }
            .user-menu {
                position: relative;
                display: inline-block;
            }
            .dropdown-content a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }
            .dropdown-content a:hover {
                background-color: #f1f1f1;
            }
        `;
        document.head.appendChild(style);
    }
});