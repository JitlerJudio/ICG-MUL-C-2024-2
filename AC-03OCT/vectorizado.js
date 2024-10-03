// Clase que representa un punto en el plano
class Punto {
    constructor(x, y) {
        // Encapsulamos los atributos de coordenadas x e y
        this._x = x;
        this._y = y;
    }

    // Métodos getter para acceder a las coordenadas
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // Métodos setter para modificar las coordenadas
    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }
}

// Clase que representa un polígono formado por puntos
class Poligono {
    constructor() {
        // Generamos una lista de puntos aleatorios para el polígono
        this._puntos = this._generarPuntosAleatorios();
    }

    // Método privado que genera entre 3 y 20 puntos aleatorios
    _generarPuntosAleatorios() {
        const numPuntos = Math.floor(Math.random() * 18) + 3; // Entre 3 y 20 puntos
        const puntos = [];

        for (let i = 0; i < numPuntos; i++) {
            const x = Math.floor(Math.random() * 500); // Coordenada x entre 0 y 500
            const y = Math.floor(Math.random() * 500); // Coordenada y entre 0 y 500
            puntos.push(new Punto(x, y)); // Creamos un nuevo punto y lo añadimos a la lista
        }

        return puntos;
    }

    // Método público para obtener los puntos
    get puntos() {
        return this._puntos;
    }

    // Método que dibuja el polígono en un contenedor SVG
    dibujarPoligonoSVG() {
        // Namespace para crear elementos SVG
        const svgNS = "http://www.w3.org/2000/svg";
        // Crear el elemento SVG
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", 500);
        svg.setAttribute("height", 500);
        svg.setAttribute("style", "border: 1px solid black");

        // Crear el polígono en sí
        const poligono = document.createElementNS(svgNS, "polygon");

        // Convertir los puntos a una cadena de texto para el atributo "points"
        let puntosAtributo = this._puntos.map(p => `${p.x},${p.y}`).join(" ");
        poligono.setAttribute("points", puntosAtributo);
        poligono.setAttribute("style", "fill:none;stroke:black;stroke-width:2");

        // Añadir el polígono al SVG
        svg.appendChild(poligono);
        // Limpiar el contenedor SVG y añadir el nuevo SVG
        const svgContainer = document.getElementById('svgContainer');
        svgContainer.innerHTML = ''; // Limpiar el contenido previo
        svgContainer.appendChild(svg); // Añadir el nuevo polígono
    }

    // Método para determinar si el polígono es cóncavo o convexo
    esConcavoOConvexo() {
        let esConcavo = false;
        let numPuntos = this._puntos.length;
        let signo = 0;

        // Ciclo que recorre todos los puntos del polígono
        for (let i = 0; i < numPuntos; i++) {
            // Calcular diferencias en coordenadas para determinar la dirección de los ángulos
            let dx1 = this._puntos[(i + 2) % numPuntos].x - this._puntos[(i + 1) % numPuntos].x;
            let dy1 = this._puntos[(i + 2) % numPuntos].y - this._puntos[(i + 1) % numPuntos].y;
            let dx2 = this._puntos[i].x - this._puntos[(i + 1) % numPuntos].x;
            let dy2 = this._puntos[i].y - this._puntos[(i + 1) % numPuntos].y;
            let z = dx1 * dy2 - dy1 * dx2; // Producto cruzado para determinar el giro

            // Verificar el signo del producto cruzado
            if (z < 0) {
                if (signo > 0) {
                    esConcavo = true;
                    break; // Si encontramos un giro inconsistente, es cóncavo
                }
                signo = -1;
            } else if (z > 0) {
                if (signo < 0) {
                    esConcavo = true;
                    break; // Si encontramos un giro inconsistente, es cóncavo
                }
                signo = 1;
            }
        }

        // Retornar el resultado
        return esConcavo ? 'Cóncavo' : 'Convexo';
    }

    // Mostrar el resultado (cóncavo o convexo) en el HTML
    mostrarResultado() {
        const resultado = this.esConcavoOConvexo(); // Determinar si es cóncavo o convexo
        document.getElementById('resultado').innerText = `El polígono es: ${resultado}`; // Mostrar el resultado
    }
}

// Función para crear un nuevo polígono
function generarNuevoPoligono() {
    const poligono = new Poligono(); // Crear un nuevo polígono
    poligono.dibujarPoligonoSVG(); // Dibujar el polígono
    poligono.mostrarResultado(); // Mostrar si es cóncavo o convexo
}

// Inicialmente, generamos un polígono al cargar la página
generarNuevoPoligono();

// Asociar el evento click del botón a la función que genera un nuevo polígono
document.getElementById('generarPoligonoBtn').addEventListener('click', generarNuevoPoligono);
