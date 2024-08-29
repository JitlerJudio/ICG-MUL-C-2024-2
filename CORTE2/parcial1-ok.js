class Coordenadas {
    constructor(tipo) {
        this.tipo = tipo;
    }

    obtenerCentro() {
        if (this.tipo === 'cartesiana') {
            return {
                x: parseFloat(document.getElementById('centroX').value),
                y: parseFloat(document.getElementById('centroY').value)
            };
        } else {
            const radio = parseFloat(document.getElementById('radio').value);
            const angulo = parseFloat(document.getElementById('angulo').value) * (Math.PI / 180);
            return {
                x: radio * Math.cos(angulo),
                y: radio * Math.sin(angulo)
            };
        }
    }
}

class Poligono {
    constructor(n, centroX, centroY, radio) {
        this.n = n;
        this.centroX = centroX;
        this.centroY = centroY;
        this.radio = radio;
    }

    calcularApotema() {
        return this.radio * Math.cos(Math.PI / this.n);
    }

    dibujar(ctx) {
        ctx.beginPath();
        for (let i = 0; i < this.n; i++) {
            const angulo = (i * 2 * Math.PI) / this.n - Math.PI / 2;
            const x = this.centroX + this.radio * Math.cos(angulo);
            const y = this.centroY + this.radio * Math.sin(angulo);
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
    const coordenadas = new Coordenadas(tipoCoordenada);
    const { x: centroX, y: centroY } = coordenadas.obtenerCentro();
    const radio = 100; // Radio fijo para simplificar

    const poligono = new Poligono(n, centroX, centroY, radio);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    poligono.dibujar(ctx);
}
