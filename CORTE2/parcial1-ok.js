class Cartesiana {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    obtenerCoordenadas() {
        return { x: this.#x, y: this.#y };
    }
}

class Polar {
    #radio;
    #angulo;

    constructor(radio, angulo) {
        this.#radio = radio;
        this.#angulo = angulo;
    }

    obtenerCoordenadas() {
        const radianes = this.#angulo * (Math.PI / 180);
        return {
            x: this.#radio * Math.cos(radianes),
            y: this.#radio * Math.sin(radianes)
        };
    }
}

class Poligono {
    #n;
    #centroX;
    #centroY;
    #medida;
    #tipoMedida;

    constructor(n, centroX, centroY, medida, tipoMedida) {
        this.#n = n;
        this.#centroX = centroX;
        this.#centroY = centroY;
        this.#medida = medida;
        this.#tipoMedida = tipoMedida;
    }

    calcularRadio() {
        if (this.#tipoMedida === 'apotema') {
            return this.#medida / Math.cos(Math.PI / this.#n);
        } else {
            return this.#medida / (2 * Math.sin(Math.PI / this.#n));
        }
    }

    dibujar(ctx) {
        const radio = this.calcularRadio();
        ctx.beginPath();
        for (let i = 0; i < this.#n; i++) {
            const angulo = (i * 2 * Math.PI) / this.#n - Math.PI / 2;
            const x = this.#centroX + radio * Math.cos(angulo);
            const y = this.#centroY + radio * Math.sin(angulo);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function cambiarEntrada() {
    const tipo = document.getElementById('tipoCoordenada').value;
    document.getElementById('entradaCartesiana').style.display = tipo === 'cartesiana' ? 'block' : 'none';
    document.getElementById('entradaPolar').style.display = tipo === 'polar' ? 'block' : 'none';
}

function iniciarDibujo() {
    const n = parseInt(document.getElementById('n').value);
    const tipoCoordenada = document.getElementById('tipoCoordenada').value;
    const tipoMedida = document.getElementById('tipoMedida').value;
    const medida = parseFloat(document.getElementById('medida').value);
    
    let coordenadas;
    if (tipoCoordenada === 'cartesiana') {
        const centroX = parseFloat(document.getElementById('centroX').value);
        const centroY = parseFloat(document.getElementById('centroY').value);
        coordenadas = new Cartesiana(centroX, centroY);
    } else {
        const radio = parseFloat(document.getElementById('radio').value);
        const angulo = parseFloat(document.getElementById('angulo').value);
        coordenadas = new Polar(radio, angulo);
    }

    const { x: centroX, y: centroY } = coordenadas.obtenerCoordenadas();
    const poligono = new Poligono(n, centroX, centroY, medida, tipoMedida);
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    poligono.dibujar(ctx);
}
