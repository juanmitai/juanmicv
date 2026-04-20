document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Animation
    const loader = document.getElementById('loader');
    const body = document.body;

    // Simular el inicio del sistema
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            body.classList.remove('loading');
        }
    }, 2000);

    // 2. Efecto de escritura para el informe de misión
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const text = typingText.innerHTML;
        typingText.innerHTML = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 20); // Escritura más rápida para texto largo
            }
        }

        // Start typing after loader is gone
        setTimeout(type, 2500);
    }

    // 3. Smooth Scrolling for Hud Nav
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a skill card, maybe trigger meter animation?
                // (Meters have CSS transition, so they animate automatically on display)
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hud-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. Subtle Parallax for Background Noise
    document.addEventListener('mousemove', (e) => {
        const noise = document.querySelector('.noise-overlay');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (noise) {
            noise.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
        }
    });

    // 6. Registrar estado del sistema en la consola
    console.log("%c [SISTEMA] IDENTIDAD_MANIFEST_INICIALIZADA ", "background: #000; color: #00f2ff; font-weight: bold;");
    console.log("%c [INFO] VERSION_ARQ_DATOS: 2.1.0 ", "color: #e0faff;");
});
