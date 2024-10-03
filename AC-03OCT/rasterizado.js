class Punto {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }
}


const puntos = [
    new Punto(100, 100),
    new Punto(200, 50),
    new Punto(300, 150),
    new Punto(250, 250),
    new Punto(150, 250)
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Función para dibujar el polígono rasterizado
function dibujarPoligono(puntos) {
    if (puntos.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }

    ctx.closePath();
    ctx.stroke();
}

// Función para determinar si el polígono es cóncavo o convexo
function esConcavoOConvexo(puntos) {
    let esConcavo = false;
    let numPuntos = puntos.length;
    let signo = 0;

    for (let i = 0; i < numPuntos; i++) {
        let dx1 = puntos[(i + 2) % numPuntos].x - puntos[(i + 1) % numPuntos].x;
        let dy1 = puntos[(i + 2) % numPuntos].y - puntos[(i + 1) % numPuntos].y;
        let dx2 = puntos[i].x - puntos[(i + 1) % numPuntos].x;
        let dy2 = puntos[i].y - puntos[(i + 1) % numPuntos].y;
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

// Dibujar la figura y mostrar si es cóncava o convexa
dibujarPoligono(puntos);
console.log(esConcavoOConvexo(puntos));
