import { Vector } from "./vector.js";

export class Triangle {
    constructor(a, b, c, color) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = color;
    }

    clone() {
        return new Triangle(this.a, this.b, this.c);
    }
}