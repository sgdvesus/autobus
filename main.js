document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Gestión del Menú Móvil ---
    const setupMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = header.querySelector('nav');
        
        // Creamos el botón de hamburguesa dinámicamente si no existe
        if (!document.getElementById('mobile-menu-btn')) {
            const btn = document.createElement('button');
            btn.id = 'mobile-menu-btn';
            btn.className = 'lg:hidden text-on-primary p-2';
            btn.innerHTML = '<span class="material-symbols-outlined text-3xl">menu</span>';
            
            // Insertar antes del botón de Iniciar Sesión
            const loginBtn = header.querySelector('button:not(#mobile-menu-btn)');
            loginBtn.parentNode.insertBefore(btn, loginBtn);

            btn.addEventListener('click', () => {
                nav.classList.toggle('hidden');
                nav.classList.toggle('flex');
                nav.classList.toggle('flex-col');
                nav.classList.toggle('absolute');
                nav.classList.toggle('top-full');
                nav.classList.toggle('left-0');
                nav.classList.toggle('w-full');
                nav.classList.toggle('bg-primary');
                nav.classList.toggle('p-6');
                nav.classList.toggle('shadow-xl');
            });
        }
    };

    // --- 2. Simulación de Filtros ---
    const handleFilters = () => {
        const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
        const priceRange = document.querySelector('input[type="range"]');
        const tripCards = document.querySelectorAll('section > div.border-l-4');

        const filterTrips = () => {
            const maxPrice = parseInt(priceRange.value);
            // Actualizar visualmente el precio en el filtro
            const priceDisplay = priceRange.nextElementSibling?.lastElementChild;
            if (priceDisplay) priceDisplay.textContent = `$${maxPrice}`;

            tripCards.forEach(card => {
                const priceText = card.querySelector('.text-xl, .text-2xl').textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                
                // Lógica de filtrado simple (Precio)
                if (price <= (maxPrice + 500)) { // Ajuste para que el rango sea funcional con tus datos
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        priceRange?.addEventListener('input', filterTrips);
        checkboxes.forEach(cb => cb.addEventListener('change', filterTrips));
    };

    // --- 3. Interacción de Selección de Viaje ---
    const handleTripSelection = () => {
        const resultsContainer = document.querySelector('section.col-span-12');

        resultsContainer?.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const card = btn.closest('.border-l-4');
            const time = card.querySelector('.text-xl, .text-2xl').textContent;
            const price = card.querySelector('.font-headline').textContent;

            // Animación de feedback
            btn.textContent = 'Cargando...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Has seleccionado el viaje de las ${time} por un precio de ${price}. Redirigiendo a pago...`);
                btn.textContent = 'Seleccionado';
                btn.classList.replace('bg-secondary', 'bg-green-600');
            }, 800);
        });
    };

    // --- 4. Efecto de Scroll en Header ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 20) {
            header.classList.add('shadow-2xl', 'bg-opacity-95');
        } else {
            header.classList.remove('shadow-2xl', 'bg-opacity-95');
        }
    });

    // Inicializar funciones
    setupMobileMenu();
    handleFilters();
    handleTripSelection();
});
