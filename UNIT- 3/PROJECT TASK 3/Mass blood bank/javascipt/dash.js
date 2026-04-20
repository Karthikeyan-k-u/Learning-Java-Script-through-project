/**
 * dash.js – Interactive functionality for Mass Blood Bank dashboard
 * Uses user data stored in localStorage by the login page.
 * Dynamically updates UI and handles interactive elements.
 */

(function() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // -------------------- MOCK USER DATABASE (fallback only) --------------------
        // In a real app, the actual user data would be fetched from a server.
        // Here we keep a default user in case localStorage is empty.
        const defaultUser = {
            name: 'Karthik',
            bloodType: 'B+',
            nextEligible: 'April 2, 2026',
            totalDonations: 7,
            livesImpacted: 24,
            urgentBloodType: 'B+'
        };

        // -------------------- GET USER DATA FROM LOCALSTORAGE --------------------
        let currentUser = null;
        const storedUser = localStorage.getItem('loggedInUser');

        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            console.log('Logged in user:', currentUser.name);
        } else {
            console.warn('No user logged in. Using default user (Karthik).');
            currentUser = defaultUser;
        }

        // -------------------- UPDATE STATIC CONTENT BASED ON USER --------------------
        // Update welcome message (h1 inside .page-title)
        const welcomeH1 = document.querySelector('.page-title h1');
        if (welcomeH1) {
            welcomeH1.textContent = `Welcome back, ${currentUser.name}`;
        }

        // Update KPI cards (target each .kpi-number inside .kpi-card)
        const kpiNumbers = document.querySelectorAll('.kpi-card .kpi-number');
        if (kpiNumbers.length >= 4) {
            kpiNumbers[0].textContent = currentUser.bloodType;               // Blood Type
            // Format next eligible date to show only month and day
            const eligibleDate = new Date(currentUser.nextEligible);
            if (!isNaN(eligibleDate)) {
                const options = { month: 'long', day: 'numeric' };
                kpiNumbers[1].textContent = eligibleDate.toLocaleDateString('en-US', options);
            } else {
                // Fallback if date parsing fails (e.g., if stored as string without year)
                kpiNumbers[1].textContent = currentUser.nextEligible.split(',')[0];
            }
            kpiNumbers[2].textContent = currentUser.totalDonations;          // Total donations
            kpiNumbers[3].textContent = currentUser.livesImpacted;           // Lives impacted
        }

        // Update the urgent message with actual user blood type
        const urgentMsgPara = document.getElementById('urgentBloodTypeMsg');
        if (urgentMsgPara) {
            urgentMsgPara.innerHTML = `<i class="fas fa-info-circle" style="color: #3b82f6;"></i> Your blood type (${currentUser.bloodType}) is urgently needed.`;
        }

        // -------------------- INTERACTIVE ELEMENTS --------------------

        // 1. Notification bell click – show a summary
        const bell = document.getElementById('notificationBell');
        if (bell) {
            bell.addEventListener('click', function(e) {
                e.stopPropagation();
                const count = bell.getAttribute('data-count') || '3';
                alert(`🔔 You have ${count} notifications:\n• Upcoming appointment on May 15\n• Blood drive near you\n• ${currentUser.bloodType} urgently needed`);
            });
        }

        // 2. Log out with confirmation (clear localStorage)
        const logoutLink = document.querySelector('a[href="login.html"]');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(e) {
                const confirmLogout = confirm('Are you sure you want to log out?');
                if (confirmLogout) {
                    // Clear stored user data
                    localStorage.removeItem('loggedInUser');
                } else {
                    e.preventDefault();
                }
            });
        }

        // 3. "Book a slot" button – simulate booking
        const bookBtn = document.getElementById('bookSlotBtn');
        if (bookBtn) {
            bookBtn.addEventListener('click', function() {
                alert('📅 Booking feature coming soon! You will be able to schedule your next donation from May 15.');
            });
        }

        // 4. All "View all" links (with class .view-all-link)
        document.querySelectorAll('.view-all-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This would take you to the full list.');
            });
        });

        // 5. "Details" link (specific class)
        const detailsLink = document.querySelector('.details-link');
        if (detailsLink) {
            detailsLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('📊 Blood stock details page - coming soon.');
            });
        }

        // 6. "Respond" link
        const respondLink = document.querySelector('.respond-link');
        if (respondLink) {
            respondLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('🚨 You will be able to respond to urgent requests in the next version.');
            });
        }

        // 7. Optional: click on urgent items to show mock response
        document.querySelectorAll('.urgent-item').forEach(item => {
            item.addEventListener('click', function() {
                const hospital = this.querySelector('span:first-child')?.innerText.trim() || 'Hospital';
                alert(`You clicked on ${hospital}. In the future, you can pledge donation here.`);
            });
        });

        // -------------------- DYNAMIC BLOOD STOCK (simulate slight changes) --------------------
        function updateStockLevels() {
            const rows = document.querySelectorAll('.blood-type-row');
            if (rows.length < 5) return;

            // Base units (same as initial)
            const baseUnits = [42, 31, 18, 9, 12];
            const types = ['O+', 'A+', 'B+', 'O-', 'AB+'];
            const maxCapacity = 55; // for percentage scaling

            rows.forEach((row, index) => {
                const bar = row.querySelector('.stock-bar');
                const valueSpan = row.querySelector('.stock-value');
                if (!bar || !valueSpan) return;

                // Slight random variation (-2 to +4 units)
                let variation = Math.floor(Math.random() * 7) - 2; // -2, -1, 0, 1, 2, 3, 4
                let newUnits = baseUnits[index] + variation;
                if (newUnits < 0) newUnits = 0;
                if (newUnits > maxCapacity) newUnits = maxCapacity;

                // Update bar width (percentage of maxCapacity)
                let percent = (newUnits / maxCapacity) * 100;
                bar.style.width = percent + '%';

                // Change color for O- if low (less than 12)
                if (types[index] === 'O-' && newUnits < 12) {
                    bar.style.background = '#d97706'; // orange
                } else if (types[index] === 'O-') {
                    bar.style.background = ''; // revert to default
                }

                // Update text
                let lowText = (newUnits < 12 && types[index] === 'O-') ? ' (low)' : '';
                valueSpan.textContent = newUnits + ' units' + lowText;
            });
        }

        // Run once after 2 seconds to show change, then every 25 seconds
        setTimeout(updateStockLevels, 2000);
        setInterval(updateStockLevels, 25000);

        // -------------------- BONUS: Update "next eligible" based on last donation (simulated) --------------------
        const lastDonationRow = document.querySelector('.history-table tbody tr:first-child td:first-child');
        if (lastDonationRow) {
            const lastDateText = lastDonationRow.textContent; // "Mar 10, 2026"
            const lastDonationDate = new Date(lastDateText);
            if (!isNaN(lastDonationDate)) {
                const nextEligibleDate = new Date(lastDonationDate);
                nextEligibleDate.setDate(lastDonationDate.getDate() + 56); // 56 days for whole blood
                const options = { month: 'long', day: 'numeric' };
                const formattedNext = nextEligibleDate.toLocaleDateString('en-US', options); // e.g., "May 5"

                // Update quick tip text
                const quickTipH4 = document.querySelector('.quick-tip h4');
                if (quickTipH4) {
                    quickTipH4.textContent = `You can donate again from ${formattedNext}`;
                }
            }
        }

        // Log that JS is active
        console.log('✅ Dashboard JS loaded – interactive & dynamic with user:', currentUser.name);
    });
})();