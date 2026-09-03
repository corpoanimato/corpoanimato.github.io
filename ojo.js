/* Selección de elementos */
const contenedorOjo = document.getElementById('contenedor-ojo');
const elementoLente = document.querySelector('.ojo__lente');

/* Movimiento del ojo con el mouse */
document.addEventListener('mousemove', (e) => {
    // Recalculamos la posición por si el ojo se ha movido (minimizado)
    const rectangulo = contenedorOjo.getBoundingClientRect();
    const centroX = rectangulo.left + rectangulo.width / 2;
    const centroY = rectangulo.top + rectangulo.height / 2;

    const anguloX = e.clientX - centroX;
    const anguloY = e.clientY - centroY;

    const movimientoMaximo = 40;
    const distancia = Math.sqrt(anguloX**2 + anguloY**2);
    
    // Si el mouse está muy lejos, limitamos el movimiento al radio máximo
    const proporcion = distancia > movimientoMaximo ? movimientoMaximo / distancia : 1;

    elementoLente.style.transform = `translate(${anguloX * proporcion}px, ${anguloY * proporcion}px)`;
});