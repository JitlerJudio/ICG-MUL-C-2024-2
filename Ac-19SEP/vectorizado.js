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

// Clase que representa un círculo, hereda de Forma
class Circulo extends Forma {
    #x; 
    #y; 
    #radio; 

    constructor(contexto, x, y, radio) {
        super(contexto); 
        this.#x = x; 
        this.#y = y; 
        this.#radio = radio; 
    }

    // Implementación del método dibujar para un círculo
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.arc(this.#x, this.#y, this.#radio, 0, Math.PI * 2); 
        this.contexto.fill(); 
        this.contexto.closePath(); 
    }
}

// Clase que representa una elipse, hereda de Forma
class Elipse extends Forma {
    #x; 
    #y; 
    #radioX; 
    #radioY; 

    constructor(contexto, x, y, radioX, radioY) {
        super(contexto); 
        this.#x = x; 
        this.#y = y; 
        this.#radioX = radioX; 
        this.#radioY = radioY; 
    }

    // Implementación del método dibujar para una elipse
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.ellipse(this.#x, this.#y, this.#radioX, this.#radioY, 0, 0, Math.PI * 2); 
        this.contexto.fill(); 
        this.contexto.closePath(); 
    }
}

// Clase que representa una línea, hereda de Forma
class Linea extends Forma {
    #x1; 
    #y1;
    #x2; 
    #y2; 

    constructor(contexto, x1, y1, x2, y2) {
        super(contexto); 
        this.#x1 = x1; 
        this.#y1 = y1; 
        this.#x2 = x2; 
        this.#y2 = y2; 
    }

    // Implementación del método dibujar para una línea
    dibujar() {
        this.contexto.beginPath(); 
        this.contexto.moveTo(this.#x1, this.#y1); 
        this.contexto.lineTo(this.#x2, this.#y2); 
        this.contexto.lineWidth = 2; 
        this.contexto.stroke(); 
        this.contexto.closePath(); 
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
    get contexto() {
        return this.#contexto;
    }
}

// Crear el lienzo y agregar formas
const lienzo = new Lienzo('miCanvas'); 
lienzo.agregarForma(new Circulo(lienzo.contexto, 100, 100, 50)); 
lienzo.agregarForma(new Elipse(lienzo.contexto, 300, 100, 80, 40)); 
lienzo.agregarForma(new Linea(lienzo.contexto, 50, 200, 450, 200));

// Dibujar todas las formas en el lienzo
lienzo.dibujar(); 
