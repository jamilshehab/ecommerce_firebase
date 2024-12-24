document.getElementById("toggleSidebar").addEventListener("click", function () {
    const sidebar = document.getElementById("logo-sidebar");
    sidebar.classList.toggle("-translate-x-full");
    console.log("Sidebar toggled!"); // Debugging message
});