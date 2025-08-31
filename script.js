document.addEventListener('DOMContentLoaded', function() {
    // SEMUA KODE LAMA (MENU, DARK MODE, ANIMASI SCROLL, FILTER, VALIDASI)
    // TETAP BERFUNGSI TANPA PERUBAHAN.
    // ... (kode dari jawaban sebelumnya) ...

    // --- KODE BARU: NAVIGASI AKTIF SAAT SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links ul li a');

    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px', // Memicu di tengah layar
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link
                navLi.forEach(link => {
                    link.classList.remove('active');
                });

                // Dapatkan link yang sesuai dengan section id
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        sectionObserver.observe(sec);
    });

    // Kode yang sudah ada dari sebelumnya (Hamburger, Dark Mode, etc.)
    // Letakkan di sini
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => animateObserver.observe(el));

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const themeIcon = darkModeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    darkModeToggle.addEventListener('click', () => {
        let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const filterContainer = document.querySelector('#portfolio-filter');
    if (filterContainer) {
        // ... (kode filter portofolio dari jawaban sebelumnya) ...
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // ... (kode validasi form dari jawaban sebelumnya) ...
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const formStatus = document.getElementById('form-status');
            clearError(name); clearError(email); clearError(message);
            formStatus.innerHTML = '';
            if (name.value.trim() === '') { showError(name, 'Nama tidak boleh kosong.'); isValid = false; }
            if (email.value.trim() === '') { showError(email, 'Email tidak boleh kosong.'); isValid = false; } else if (!isValidEmail(email.value)) { showError(email, 'Format email tidak valid.'); isValid = false; }
            if (message.value.trim() === '') { showError(message, 'Pesan tidak boleh kosong.'); isValid = false; }
            if (isValid) { formStatus.innerHTML = '<p class="success">Pesan Anda berhasil dikirim! Terima kasih.</p>'; contactForm.reset(); } else { formStatus.innerHTML = '<p class="error">Silakan perbaiki error sebelum mengirim.</p>'; }
        });
        function showError(input, message) { const formGroup = input.parentElement; formGroup.classList.add('error'); const errorElement = formGroup.querySelector('.error-message'); errorElement.innerText = message; }
        function clearError(input) { const formGroup = input.parentElement; formGroup.classList.remove('error'); const errorElement = formGroup.querySelector('.error-message'); errorElement.innerText = ''; }
        function isValidEmail(email) { const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; return re.test(String(email).toLowerCase()); }
    }
});
