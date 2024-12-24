const menuButton = document.querySelector('[data-collapse-toggle="ecommerce-navbar-menu-1"]');
const navbarMenu = document.getElementById('ecommerce-navbar-menu-1');

menuButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('hidden');
});

// Toggle Dropdown
const dropdownButton = document.getElementById('userDropdownButton1');
const dropdownMenu = document.getElementById('userDropdown1');

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});