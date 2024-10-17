const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 

// Dibuja un polígono en el canvas
function drawPolygon() {
    ctx.fillStyle = 'lightgray'; // Establece el color de relleno
    ctx.beginPath(); 
    // Define los vértices del polígono
    ctx.moveTo(100, 100); 
    ctx.lineTo(200, 100); 
    ctx.lineTo(200, 200); 
    ctx.lineTo(100, 200); 
    ctx.closePath(); 
    ctx.fill(); // Rellena el polígono con el color especificado
}

// Algoritmo Flood Fill
function floodFill(x, y, targetColor, replacementColor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Obtiene los datos de la imagen del canvas
    const data = imageData.data; 
    const width = imageData.width; 
    const height = imageData.height; 

    // Función para obtener el índice del píxel en el array de datos
    function getPixelIndex(x, y) {
        return (y * width + x) * 4; // Cada píxel tiene 4 componentes (RGBA)
    }

    // Convierte el color objetivo y de reemplazo a valores entre 0-255
    const targetColorArray = targetColor.map(c => c * 255);
    const replacementColorArray = replacementColor.map(c => c * 255);

    const stack = [[x, y]]; // Inicializa una pila para el algoritmo

    while (stack.length > 0) { // Mientras haya píxeles en la pila
        const [x, y] = stack.pop(); 
        const pixelIndex = getPixelIndex(x, y); 

        // Verifica si el píxel está fuera de los límites del canvas
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        // Verifica si el color del píxel coincide con el color objetivo
        if (data[pixelIndex] !== targetColorArray[0] || 
            data[pixelIndex + 1] !== targetColorArray[1] || 
            data[pixelIndex + 2] !== targetColorArray[2]) continue;

        // Reemplaza el color del píxel
        data[pixelIndex] = replacementColorArray[0];
        data[pixelIndex + 1] = replacementColorArray[1];
        data[pixelIndex + 1] = replacementColorArray[2];

        // Agrega los píxeles vecinos a la pila
        stack.push([x + 1, y]); // Derecha
        stack.push([x - 1, y]); // Izquierda
        stack.push([x, y + 1]); // Abajo
        stack.push([x, y - 1]); // Arriba
    }

    ctx.putImageData(imageData, 0, 0); // Actualiza el canvas con los nuevos datos de imagen
}

// Dibuja una línea en el canvas
function drawLine() {
    ctx.strokeStyle = 'blue'; 
    ctx.lineWidth = 2; 
    ctx.beginPath(); 
    ctx.moveTo(50, 50); 
    ctx.lineTo(300, 300);
    ctx.stroke(); 
}
// Algoritmo Cohen-Sutherland
function cohenSutherlandLineClip(x0, y0, x1, y1) {
    const codeOut = (x, y) => {
        let code = 0;
        if (x < 100) code |= 1;   // Izquierda
        if (x > 400) code |= 2;   // Derecha
        if (y < 100) code |= 4;   // Abajo
        if (y > 400) code |= 8;   // Arriba
        return code; // Devuelve el código resultante
    };
    let code0 = codeOut(x0, y0); 
    let code1 = codeOut(x1, y1); 
    let accept = false; 

    while (true) {
        if (!(code0 | code1)) { // Si ambos códigos son 0, la línea está completamente dentro
            accept = true;
            break;
        } else if (code0 & code1) { // Si ambos códigos tienen bits en común, la línea está completamente fuera
            break;
        } else {
            let codeOut = code0 ? code0 : code1; 
            let x, y; 

            // Determina en qué borde debe ser recortada la línea
            if (codeOut & 8) { // Arriba
                x = x0 + (x1 - x0) * (400 - y0) / (y1 - y0);
                y = 400;
            } else if (codeOut & 4) { // Abajo
                x = x0 + (x1 - x0) * (100 - y0) / (y1 - y0);
                y = 100;
            } else if (codeOut & 2) { // Derecha
                y = y0 + (y1 - y0) * (400 - x0) / (x1 - x0);
                x = 400;
            } else if (codeOut & 1) { // Izquierda
                y = y0 + (y1 - y0) * (100 - x0) / (x1 - x0);
                x = 100;
            }

            // Actualiza las coordenadas de los extremos de la línea
            if (codeOut === code0) {
                x0 = x; 
                y0 = y;
                code0 = codeOut(x0, y0); // Recalcula el código para el nuevo punto
            } else {
                x1 = x; 
                y1 = y;
                code1 = codeOut(x1, y1); // Recalcula el código para el nuevo punto
            }
        }
    }

    // Si la línea es aceptada, dibuja la línea recortada
    if (accept) {
        ctx.strokeStyle = 'red'; 
        ctx.lineWidth = 2; 
        ctx.beginPath(); 
        ctx.moveTo(x0, y0); 
        ctx.lineTo(x1, y1); 
        ctx.stroke(); 
    }
}

// Aplicar el relleno
function applyFloodFill() {
    drawPolygon(); // Dibuja el polígono
    floodFill(150, 150, [0.5, 0.5, 0.5], [1, 0, 0]); 
}

// Aplicar el recorte
function applyCohenSutherland() {
    drawLine(); // Dibuja la línea
    cohenSutherlandLineClip(50, 50, 300, 300); 
}

// Inicializa el canvas
drawPolygon(); 
