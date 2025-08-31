// Mengambil elemen yang dibutuhkan dari HTML
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Menambahkan event listener 'click' pada ikon hamburger
hamburger.addEventListener('click', () => {
    // Toggle class 'nav-active' pada nav-links
    // Ini akan memunculkan atau menyembunyikan menu
    navLinks.classList.toggle('nav-active');

    // Animasi ikon hamburger menjadi 'X' (opsional)
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});
