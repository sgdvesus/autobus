document.addEventListener('DOMContentLoaded', () => {
    // Configuraciones
    const SEAT_PRICE = 1450.00;
    const totalSeats = 38;
    const occupiedSeats = [1, 2, 8, 12, 15, 24, 30, 31]; // Simulación de ocupados
    
    let selectedSeats = [];

    // Elementos del DOM
    const busGrid = document.getElementById('bus-grid');
    const selectedSeatsDisplay = document.getElementById('selected-seats-display');
    const totalPriceDisplay = document.getElementById('total-price-display');

    /**
     * Inicializa el mapa de asientos
     */
    function initBusLayout() {
        if (!busGrid) return;
        busGrid.innerHTML = ''; // Limpiar grid

        // Fondo visual del pasillo (opcional)
        const aisleBg = document.createElement('div');
        aisleBg.className = "absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bus-aisle opacity-10 pointer-events-none";
        busGrid.appendChild(aisleBg);

        // Generamos los asientos de 4 en 4 (una fila completa)
        for (let i = 1; i <= totalSeats; i += 4) {
            
            // Creamos los 4 asientos de la fila actual
            for (let j = 0; j < 4; j++) {
                const seatNumber = i + j;

                // Si el número de asiento excede el total, no dibujamos nada
                if (seatNumber > totalSeats) break;

                // Lógica del pasillo: Insertar espacio vacío en la columna 3 (después del segundo asiento)
                if (j === 2) {
                    const spacer = document.createElement('div');
                    spacer.className = "col-span-1"; 
                    busGrid.appendChild(spacer);
                }

                const isOccupied = occupiedSeats.includes(seatNumber);
                const seat = document.createElement('button');
                
                // Formato 01, 02...
                seat.innerText = seatNumber < 10 ? `0${seatNumber}` : seatNumber;
                
                const baseStyles = "w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-200 z-10 shadow-sm";
                
                if (isOccupied) {
                    seat.className = `${baseStyles} bg-slate-200 text-white cursor-not-allowed`;
                    seat.disabled = true;
                } else {
                    seat.className = `${baseStyles} border-2 border-[#10B981] bg-white text-[#10B981] hover:bg-emerald-50 active:scale-90`;
                    seat.addEventListener('click', () => toggleSeat(seat, seatNumber));
                }

                busGrid.appendChild(seat);
            }
        }
    }

    /**
     * Maneja la selección de asientos
     */
    function toggleSeat(seatElement, seatId) {
        const index = selectedSeats.indexOf(seatId);

        if (index > -1) {
            // Deseleccionar
            selectedSeats.splice(index, 1);
            seatElement.classList.remove('bg-secondary', 'text-white', 'ring-2', 'ring-offset-2', 'ring-secondary', 'border-transparent');
            seatElement.classList.add('bg-white', 'text-[#10B981]', 'border-2', 'border-[#10B981]');
        } else {
            // Seleccionar
            selectedSeats.push(seatId);
            seatElement.classList.remove('bg-white', 'text-[#10B981]', 'border-2', 'border-[#10B981]');
            seatElement.classList.add('bg-secondary', 'text-white', 'ring-2', 'ring-offset-2', 'ring-secondary', 'border-transparent');
        }

        updateSummary();
    }

    /**
     * Actualiza los datos del panel lateral
     */
    function updateSummary() {
        // Ordenar para que se vea limpio
        selectedSeats.sort((a, b) => a - b);
        
        // Texto de asientos
        selectedSeatsDisplay.innerText = selectedSeats.length > 0 
            ? selectedSeats.map(s => s < 10 ? `0${s}` : s).join(', ') 
            : '--';

        // Cálculo de precio
        const total = selectedSeats.length * SEAT_PRICE;
        
        // Formato moneda local
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        });

        totalPriceDisplay.innerText = formatter.format(total);
    }

    // Arrancar
    initBusLayout();
});
