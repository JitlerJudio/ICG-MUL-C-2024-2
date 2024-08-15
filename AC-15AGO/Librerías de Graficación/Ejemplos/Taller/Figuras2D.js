// Agregar un evento al botón "Dibujar Figura"
document.getElementById('dibujar').addEventListener('click', function() {
    // Obtener el valor de la figura seleccionada
    const figura = document.getElementById('figura').value;
    // Obtener y convertir las coordenadas X e Y a números
    let coordenadaX = parseFloat(document.getElementById('coordenadaX').value);
    let coordenadaY = parseFloat(document.getElementById('coordenadaY').value);
    // Obtener el tipo de coordenadas seleccionadas (cartesianas o polares)
    const tipoCoordenadas = document.querySelector('input[name="coordenadas"]:checked').value;
    // Obtener el color seleccionado
    const color = document.getElementById('color').value;
    // Obtener el tamaño de la figura, con un valor por defecto de 20 si no se ingresa nada
    const tamano = parseFloat(document.getElementById('tamano').value) || 20;

    // Obtener el contexto del canvas para dibujar
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Limpiar el mensaje anterior
    document.getElementById('mensaje').innerText = '';

    // Si se seleccionan coordenadas polares, convertirlas a cartesianas
    if (tipoCoordenadas === 'polares') {
        const radio = coordenadaX; // Usar coordenada X como radio
        const angulo = coordenadaY * (Math.PI / 180); // Convertir el ángulo a radianes
        // Calcular las coordenadas cartesianas
        coordenadaX = radio * Math.cos(angulo) + canvas.width / 2;
        coordenadaY = radio * Math.sin(angulo) + canvas.height / 2;

        // Mostrar el mensaje de transformación de coordenadas
        document.getElementById('mensaje').innerText = `Coordenadas polares (${radio}, ${coordenadaY}°) convertidas a cartesianas (${coordenadaX.toFixed(2)}, ${coordenadaY.toFixed(2)})`;
    } else {
        // Mostrar el mensaje de coordenadas cartesianas
        document.getElementById('mensaje').innerText = `Coordenadas cartesianas (${coordenadaX}, ${coordenadaY})`;
    }

    // Establecer el color de la figura
    ctx.fillStyle = color;

    // Dibujar la figura seleccionada
    switch (figura) {
        case 'circulo':
            ctx.beginPath(); // Iniciar un nuevo camino
            ctx.arc(coordenadaX, coordenadaY, tamano, 0, Math.PI * 2); // Dibujar un círculo
            ctx.fill(); // Rellenar el círculo
            ctx.closePath(); // Cerrar el camino
            break;
        case 'cuadrado':
            ctx.fillRect(coordenadaX - tamano / 2, coordenadaY - tamano / 2, tamano, tamano); // Dibujar un cuadrado
            break;
        case 'triangulo':
            ctx.beginPath(); // Iniciar un nuevo camino
            ctx.moveTo(coordenadaX, coordenadaY - tamano); // Mover a la parte superior del triángulo
            ctx.lineTo(coordenadaX - tamano / 2, coordenadaY + tamano / 2); // 
            ctx.lineTo(coordenadaX + tamano / 2, coordenadaY + tamano / 2); // 
            ctx.closePath(); // Cerrar el camino
            ctx.fill(); // Rellenar el triángulo
            break;
        case 'rectangulo':
            ctx.fillRect(coordenadaX - tamano, coordenadaY - tamano / 2, tamano * 2, tamano); // Dibujar un rectángulo
            break;
    }
});