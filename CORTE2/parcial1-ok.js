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

