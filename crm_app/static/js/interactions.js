/* ========================================
   Interactive Features & UI Enhancements
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
});

function initializeUI() {
    initializeTooltips();
    initializeFormValidation();
    initializeConfirmDialogs();
    initializeLoadingStates();
    initializeSmoothScroll();
}

/* ===== TOOLTIPS ===== */
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = e.target.getAttribute('data-tooltip');
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltip-popup';
    tooltipEl.textContent = tooltip;
    document.body.appendChild(tooltipEl);

    const rect = e.target.getBoundingClientRect();
    tooltipEl.style.left = (rect.left + rect.width / 2) + 'px';
    tooltipEl.style.top = (rect.top - 10) + 'px';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip-popup');
    tooltips.forEach(el => el.remove());
}

/* ===== FORM VALIDATION ===== */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                showFormError(form, 'Please fill in all required fields');
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;

    if (!value) {
        field.classList.add('is-invalid');
        return false;
    }

    if (type === 'email' && !isValidEmail(value)) {
        field.classList.add('is-invalid');
        return false;
    }

    field.classList.remove('is-invalid');
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(form, message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.innerHTML = `<i class="bi bi-exclamation-circle"></i> <div>${message}</div>`;
    alert.style.animation = 'slideDown 0.3s ease-out';

    form.parentNode.insertBefore(alert, form);

    setTimeout(() => {
        alert.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

/* ===== CONFIRM DIALOGS ===== */
function initializeConfirmDialogs() {
    const deleteLinks = document.querySelectorAll('a[href*="delete"]');
    deleteLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });
}

/* ===== LOADING STATES ===== */
function initializeLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"], a.btn-primary');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.tagName === 'BUTTON' || this.parentElement.tagName === 'FORM') {
                const originalText = this.innerHTML;
                this.disabled = true;
                this.innerHTML = '<i class="bi bi-hourglass-split spinner"></i> Processing...';

                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
}

/* ===== SMOOTH SCROLL ===== */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===== NOTIFICATION SYSTEM ===== */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.style.animation = 'slideInRight 0.3s ease-out';

    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    notification.innerHTML = `<i class="bi bi-${icon}"></i> <div>${message}</div>`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ===== COPY TO CLIPBOARD ===== */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    });
}

/* ===== KEYBOARD SHORTCUTS ===== */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Search"]');
            if (searchInput) searchInput.focus();
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => modal.classList.remove('show'));
        }
    });
}

/* ===== DARK MODE TOGGLE (Optional) ===== */
function initializeDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    const isDark = savedMode ? savedMode === 'true' : prefersDark;

    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

/* ===== TABLE SORTING ===== */
function initializeTableSort() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const isAscending = table.getAttribute('data-sort-asc') === 'true';

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        const aNum = parseFloat(aValue) || aValue;
        const bNum = parseFloat(bValue) || bValue;

        if (aNum < bNum) return isAscending ? 1 : -1;
        if (aNum > bNum) return isAscending ? -1 : 1;
        return 0;
    });

    rows.forEach(row => table.querySelector('tbody').appendChild(row));
    table.setAttribute('data-sort-asc', isAscending ? 'false' : 'true');
}

/* ===== EXPORT DATA ===== */
function exportTableToCSV(filename = 'export.csv') {
    const table = document.querySelector('table');
    let csv = [];

    // Get headers
    const headers = Array.from(table.querySelectorAll('th')).map(h => h.textContent.trim());
    csv.push(headers.join(','));

    // Get rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(cell => `"${cell.textContent.trim()}"`);
        csv.push(cells.join(','));
    });

    // Download
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', filename);
    link.click();
}

/* ===== PAGINATION ===== */
function initializePagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNum = link.getAttribute('data-page');
            loadPage(pageNum);
        });
    });
}

function loadPage(pageNum) {
    // Add your page loading logic here
    console.log('Loading page:', pageNum);
}

/* ===== INIT ALL ===== */
initializeKeyboardShortcuts();
initializeDarkModeToggle();
initializeTableSort();
