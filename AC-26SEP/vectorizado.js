// Clase base que representa una forma genérica
class Forma {
    #contexto; 

    constructor(contexto) {
        this.#contexto = contexto;
    }

    // Método que debe ser implementado por las subclases
    dibujar() {
        throw new Error("Método 'dibujar()' debe ser implementado.");
    }
}

// Clase que representa un punto, hereda de Forma
class Punto extends Forma {
    #x; 
    #y; 

    constructor(contexto, x, y) {
        super(contexto); 
        this.#x = x; 
        this.#y = y; 
    }

    // Implementación del método dibujar para un punto
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.arc(this.#x, this.#y, 2, 0, Math.PI * 2); 
        this.contexto.fill(); 
        this.contexto.closePath(); 
    }
}

// Clase que representa un círculo, hereda de Forma
class Circulo extends Forma {
    #punto; 
    #radio; 

    constructor(contexto, punto, radio) {
        super(contexto); 
        this.#punto = punto; 
        this.#radio = radio; 
    }

    // Implementación del método dibujar para un círculo
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.arc(this.#punto.x, this.#punto.y, this.#radio, 0, Math.PI * 2); 
        this.contexto.fill(); 
        this.contexto.closePath(); 
    }
}

// Clase que representa una elipse, hereda de Forma
class Elipse extends Forma {
    #punto; 
    #radioX; 
    #radioY; 

    constructor(contexto, punto, radioX, radioY) {
        super(contexto); 
        this.#punto = punto; 
        this.#radioX = radioX; 
        this.#radioY = radioY; 
    }

    // Implementación del método dibujar para una elipse
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.ellipse(this.#punto.x, this.#punto.y, this.#radioX, this.#radioY, 0, 0, Math.PI * 2); 
        this.contexto.fill(); 
        this.contexto.closePath(); 
    }
}

// Clase que representa una línea, hereda de Forma
class Linea extends Forma {
    #punto1; 
    #punto2; 

    constructor(contexto, punto1, punto2) {
        super(contexto); 
        this.#punto1 = punto1; 
        this.#punto2 = punto2; 
    }

    // Implementación del método dibujar para una línea (ahora dibuja dos puntos)
    dibujar() {
        this.#punto1.dibujar(); 
        this.#punto2.dibujar(); 
    }
}

// Clase que representa el lienzo donde se dibujan las formas
class Lienzo {
    #canvas; 
    #contexto; 
    #formas; 

    constructor(canvasId) {
        this.#canvas = document.getElementById(canvasId); 
        this.#contexto = this.#canvas.getContext('2d'); 
        this.#formas = []; 
    }

    // Método para agregar una forma al lienzo
    agregarForma(forma) {
        this.#formas.push(forma); 
    }

    // Método para dibujar todas las formas en el lienzo
    dibujar() {
        this.#formas.forEach(forma => forma.dibujar());
    }

    // Método para obtener el contexto (necesario para crear formas)
    get contexto () {
        return this.#contexto;
    } 
}