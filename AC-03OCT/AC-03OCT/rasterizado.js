// Clase que representa un punto en el plano
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(value) {
        this.#x = value;
    }

    set y(value) {
        this.#y = value;
    }
}

// Clase que representa un polígono formado por puntos
class Poligono {
    #puntos;

    constructor() {
        this.#puntos = this.#generarPuntosAleatorios();
    }

    #generarPuntosAleatorios() {
        const numPuntos = Math.floor(Math.random() * 18) + 3; // Entre 3 y 20 puntos
        const puntos = [];

        for (let i = 0; i < numPuntos; i++) {
            const x = Math.floor(Math.random() * 500); // Coordenada x entre 0 y 500
            const y = Math.floor(Math.random() * 500); // Coordenada y entre 0 y 500
            puntos.push(new Punto(x, y)); // Creamos un nuevo punto y lo añadimos a la lista
        }

        return puntos;
    }

    get puntos() {
        return this.#puntos;
    }

    // Método que dibuja el polígono en un contenedor canvas
    dibujarPoligonoCanvas(ctx) {
        // Limpiar el canvas
        ctx.clearRect(0, 0, 500, 500);

        // Dibujar el polígono
        ctx.beginPath();
        ctx.moveTo(this.#puntos[0].x, this.#puntos[0].y);
        this.#puntos.forEach(p => {
            ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calcular el centroide
        const centroide = this.calcularCentroide();
        
        // Dibujar el centroide
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(centroide.x, centroide.y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar líneas desde el centroide hasta cada punto
        ctx.strokeStyle = "blue";
        this.#puntos.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(centroide.x, centroide.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        });
    }

    // Método para calcular el centroide del polígono
    calcularCentroide() {
        let sumaX = 0;
        let sumaY = 0;
        const numPuntos = this.#puntos.length;

        // Calcular la suma de las coordenadas x e y
        this.#puntos.forEach(p => {
            sumaX += p.x;
            sumaY += p.y;
        });

        // Calcular el promedio (centroide)
        return new Punto(sumaX / numPuntos, sumaY / numPuntos);
    }

    // Método para determinar si el polígono es cóncavo o convexo
    esConcavoOConvexo() {
        let esConcavo = false;
        let numPuntos = this.#puntos.length;
        let signo = 0;

        for (let i = 0; i < numPuntos; i++) {
            let dx1 = this.#puntos[(i + 2) % numPuntos].x - this.#puntos[(i + 1) % numPuntos].x;
            let dy1 = this.#puntos[(i + 2) % numPuntos].y - this.#puntos[(i + 1) % numPuntos].y;
            let dx2 = this.#puntos[i].x - this.#puntos[(i + 1) % numPuntos].x;
            let dy2 = this.#puntos[i].y - this.#puntos[(i + 1) % numPuntos].y;
            let z = dx1 * dy2 - dy1 * dx2;

            if (z < 0) {
                if (signo > 0) {
                    esConcavo = true;
                    break;
                }
                signo = -1;
            } else if (z > 0) {
                if (signo < 0) {
                    esConcavo = true;
                    break;
                }
                signo = 1;
            }
        }

        return esConcavo ? 'Cóncavo' : 'Convexo';
    }

    // Mostrar el resultado (cóncavo o convexo) en el HTML
    mostrarResultado() {
        const resultado = this.esConcavoOConvexo();
        document.getElementById('resultado').innerText = `El polígono es: ${resultado}`;
    }
}

// Función para crear un nuevo polígono
function generarNuevoPoligono() {
    const poligono = new Poligono(); // Crear un nuevo polígono
    const canvas = document.getElementById('canvas'); // Obtener el contexto del canvas
    const ctx = canvas.getContext('2d'); // Obtener el contexto 2D
    poligono.dibujarPoligonoCanvas(ctx); // Dibujar el polígono
    poligono.mostrarResultado(); // Mostrar si es cóncavo o convexo
}

// Inicialmente, generamos un polígono al cargar la página
generarNuevoPoligono();

// Asociar el evento click del botón a la función que genera un nuevo polígono
document.getElementById('generarPoligonoBtn').addEventListener('click', generarNuevoPoligono);
