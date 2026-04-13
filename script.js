document.addEventListener("DOMContentLoaded", () => {

    // Inisialisasi Ikon
    lucide.createIcons();

    // Konfigurasi Gambar Gallery
    const GALLERY_IMAGES = [
        "https://wallpapercave.com/wp/wp2493775.jpg",
        "https://wallpapercave.com/wp/wp2493789.jpg",
        "https://wallpapercave.com/wp/wp2493808.jpg",
        "https://wallpapercave.com/wp/wp2493813.jpg",
        "https://wallpapercave.com/wp/wp2493814.jpg",
        "https://wallpapercave.com/wp/wp2493831.jpg",
        "https://wallpapercave.com/wp/wp2493836.jpg",
        "https://wallpapercave.com/wp/wp2493869.jpg",
        "https://wallpapercave.com/wp/wp2493859.jpg",
    ];

    // Menu Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.style.transform = isMenuOpen ? 'translateY(0)' : 'translateY(-100%)';
        menuToggle.innerHTML = isMenuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        window.scrollY > 50 
            ? navbar.classList.add('navbar-scrolled') 
            : navbar.classList.remove('navbar-scrolled');
    });

    // Gallery
    const galleryGrid = document.getElementById('gallery-grid');

    GALLERY_IMAGES.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer reveal';
        item.style.transitionDelay = `${i * 0.1}s`;

        item.innerHTML = `
            <img src="${src}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h3 class="text-xl font-serif font-bold">Artwork Series ${i + 1}</h3>
            </div>`;

        galleryGrid.appendChild(item);

        // OPEN POPUP
        item.addEventListener("click", () => {
            const popup = document.getElementById("image-popup");
            const popupImg = document.getElementById("popup-img");
            const popupTitle = document.getElementById("popup-title");

            popupImg.src = src;
            popupTitle.textContent = `Artwork Series ${i + 1}`;

            popup.classList.remove("hidden");
            popup.classList.add("flex");
        });
    });

    // Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal();

    // === POPUP CLOSE (KLIK POPUP) 🔥 ===
    const popup = document.getElementById("image-popup");

    popup.addEventListener("click", () => {
        popup.classList.add("hidden");
        popup.classList.remove("flex");
    });

    // ESC = close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            popup.classList.add("hidden");
            popup.classList.remove("flex");
        }
    });

});


// ================= FIRELIES =================
const canvas = document.getElementById("fire-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireflies = [];

function createFirefly() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * -1.5 - 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        glow: Math.random() * 0.5 + 0.5,
        flicker: Math.random() * 0.03
    };
}

for (let i = 0; i < 50; i++) {
    fireflies.push(createFirefly());
}

function drawFireflies() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireflies.forEach((f, i) => {
        f.glow += (Math.random() - 0.5) * f.flicker;

        let gradient = ctx.createRadialGradient(
            f.x, f.y, 0,
            f.x, f.y, f.size * 6
        );

        gradient.addColorStop(0, `rgba(255, 230, 150, ${f.glow})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 6, 0, Math.PI * 2);
        ctx.fill();

        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.y * 0.05) * 0.3;

        if (f.y < -20) {
            fireflies[i] = createFirefly();
        }
    });
}

function animate() {
    drawFireflies();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});