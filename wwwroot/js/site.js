// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.sidebar-group-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            btn.closest('.sidebar-group').classList.toggle('open');
        });
    });

    var sidebarToggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    document.querySelectorAll('.user-menu-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            btn.closest('.user-menu').classList.toggle('open');
        });
    });
    document.addEventListener('click', function () {
        document.querySelectorAll('.user-menu.open').forEach(function (m) {
            m.classList.remove('open');
        });
    });

    // Basic deterrents against copying protected document content.
    // Note: this cannot block real screenshots (Print Screen, phone camera, OS tools).
    document.querySelectorAll('.protected-content').forEach(function (el) {
        el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
        el.addEventListener('copy', function (e) { e.preventDefault(); });
        el.addEventListener('cut', function (e) { e.preventDefault(); });
    });
    document.addEventListener('keydown', function (e) {
        if (!document.querySelector('.protected-content')) return;
        var key = e.key ? e.key.toLowerCase() : '';
        if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'p' || key === 's')) {
            e.preventDefault();
        }
    });
});
