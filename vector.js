export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p, q) {
        return new Vector(p.x + q.x, p.y + q.y);
    }

    subtract(p, q) {
        return new Vector(p.x - q.x, p.y - q.y);
    }

    scalar(v, n) {
        return new Vector(v.x * n, v.y * n);
    }
    
    length(p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    distance(p, q) {
        return this.length(this.subtract(p, q));
    }

    dot(p, q) {
        return p.x * q.x + p.y * q.y;
    }

    cross(p, q) {
        return p.x * q.y - p.y * q.x;
    }

    circumcenter(a, b, c) {
        if(b.y - a.y == 0 ) {
            let tmp = b;
            b = c;
            c = tmp;
        } else if(c.y - b.y == 0) {
            let tmp = b;
            b = a;
            a = tmp;
        }

        const slope1 = -(b.x - a.x) / (b.y - a.y);
        const slope2 = -(c.x - b.x) / (c.y - b.y);

        const midPoint1 = this.scalar(this.add(a, b), 0.5);
        const midPoint2 = this.scalar(this.add(b, c), 0.5);

        const circumcenterX = (-midPoint1.y + midPoint2.y + slope1 * midPoint1.x - slope2 * midPoint2.x) / (slope1 - slope2);
        const circumcenterY = slope1 * (circumcenterX - midPoint1.x) + midPoint1.y;

        return {
            r: this.distance(b, new Vector(circumcenterX, circumcenterY)),
            v: new Vector(circumcenterX, circumcenterY),
        };
    }
}