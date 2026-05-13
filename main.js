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


/**
 * Lógica para la Selección de Asientos - Acosta
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial
    const SEAT_PRICE = 1450.00;
    const totalSeats = 40; // Número total de asientos en el bus
    const occupiedSeats = [1, 2, 5, 15, 16, 22, 28]; // Simulación de base de datos
    
    let selectedSeats = [];

    // Referencias al DOM
    const busGrid = document.getElementById('bus-grid');
    const selectedSeatsDisplay = document.getElementById('selected-seats-display');
    const totalPriceDisplay = document.querySelector('.text-3xl.font-black'); // El elemento del precio total

    /**
     * Genera la malla de asientos del autobús
     */
    function initBusLayout() {
        busGrid.innerHTML = ''; // Limpiar grid
        
        // El pasillo visual (re-inyectar porque innerHTML limpia todo)
        const aisle = document.createElement('div');
        aisle.className = "absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bus-aisle opacity-20 pointer-events-none";
        busGrid.appendChild(aisle);

        for (let i = 1; i <= totalSeats; i++) {
            const isOccupied = occupiedSeats.includes(i);
            
            // Crear el elemento asiento
            const seat = document.createElement('button');
            seat.innerText = i < 10 ? `0${i}` : i;
            
            // Estilos base
            const baseStyles = "w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200";
            
            if (isOccupied) {
                // Estado Ocupado
                seat.className = `${baseStyles} bg-[#D1D5DB] text-white cursor-not-allowed`;
                seat.disabled = true;
            } else {
                // Estado Disponible
                seat.className = `${baseStyles} border-2 border-[#10B981] bg-white text-[#10B981] hover:bg-emerald-50 active:scale-90`;
                seat.dataset.seatId = i;
                seat.addEventListener('click', () => toggleSeat(seat, i));
            }

            busGrid.appendChild(seat);

            // Lógica de pasillo: Insertar un espacio vacío después de 2 asientos (columnas 2 y 4)
            if (i % 2 === 0 && i % 4 !== 0) {
                const spacer = document.createElement('div');
                spacer.className = "col-span-1";
                busGrid.appendChild(spacer);
            }
        }
    }

    /**
     * Maneja la selección y deselección
     */
    function toggleSeat(seatElement, seatId) {
        const index = selectedSeats.indexOf(seatId);

        if (index > -1) {
            // Deseleccionar
            selectedSeats.splice(index, 1);
            seatElement.classList.remove('bg-secondary', 'text-white', 'ring-2', 'ring-offset-2', 'ring-secondary');
            seatElement.classList.add('bg-white', 'text-[#10B981]', 'border-2', 'border-[#10B981]');
        } else {
            // Seleccionar
            selectedSeats.push(seatId);
            seatElement.classList.remove('bg-white', 'text-[#10B981]', 'border-2', 'border-[#10B981]');
            seatElement.classList.add('bg-secondary', 'text-white', 'ring-2', 'ring-offset-2', 'ring-secondary');
        }

        updateSummary();
    }

    /**
     * Actualiza el panel lateral de resumen
     */
    function updateSummary() {
        // Ordenar asientos numéricamente
        selectedSeats.sort((a, b) => a - b);
        
        // Mostrar lista de asientos o "Ninguno"
        selectedSeatsDisplay.innerText = selectedSeats.length > 0 
            ? selectedSeats.map(s => s < 10 ? `0${s}` : s).join(', ') 
            : '--';

        // Calcular total
        const total = selectedSeats.length * SEAT_PRICE;
        
        // Formatear moneda
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        });

        totalPriceDisplay.innerText = formatter.format(total);
    }

    // Inicializar al cargar
    initBusLayout();
});
