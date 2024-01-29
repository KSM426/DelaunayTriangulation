import { Vector } from "./vector.js";
import { Line } from "./line.js";
import { Triangle } from "./triangle.js";


const NUM = 100;
const SUPERTRIANGLE = 3;
const SIDE = (3 + Math.round(Math.random()) * 2) * 4;
const LAST = NUM + SUPERTRIANGLE + SIDE;
export class DelaunayTriangulation {
    constructor() {
    
    }
    
    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
        this.superTriangle = [new Vector(this.stageWidth / 2, - this.stageHeight), new Vector( - this.stageWidth / 2, this.stageHeight), new Vector(this.stageWidth * 3 / 2, this.stageHeight)]
        
        this.triangles = [];
        this.triangles[0] = new Triangle(0, 1, 2);
        
        this.points = [];
        for(let i=0; i<3; i++) {
            this.points[i] = this.superTriangle[i];
        }
        
        for(let i=0; i<SIDE / 4; i++) {
            const L = SIDE / 4;
            this.points.push(new Vector(this.stageWidth / L * i, 1));
            this.points.push(new Vector(this.stageWidth - 1, this.stageHeight / L * i));
            this.points.push(new Vector(this.stageWidth - this.stageWidth / L * i, this.stageHeight - 1));
            this.points.push(new Vector(1, this.stageHeight - this.stageHeight / L * i));
        }
        
        for(let i=0; i<NUM; i++) {
            this.points.push(this.randomPoints());
        }

        for (let i=3; i<this.points.length; i++) {
            let point = this.points[i];
            let edges = [];
    
            for (let j=this.triangles.length - 1; j>=0; j--) {
                // let triangle = this.triangles[j].clone();
                // if (this.checkCircumscriber(triangle, point)) {
                //     console.log("delete", i, this.triangles[j], this.triangles);
                //     edges.push(new Line(triangle.a, triangle.b), new Line(triangle.b, triangle.c), new Line(triangle.c, triangle.a));
                //     this.triangles.splice(j, 1); // 삼각형 제거
                // }
                this.triangles = this.triangles.filter((triangle, j) => {
                    if (this.checkCircumscriber(triangle, point)) {
                        edges.push(new Line(triangle.a, triangle.b), new Line(triangle.b, triangle.c), new Line(triangle.c, triangle.a));
                        return false;
                    }
                    return true;
                });
            }
            
            let unique = [];
            let duplicates = [];
            for (let value of edges) {
                let reversedLine = new Line(value.e, value.s);
            
                if (
                    unique.some(line => line.s === value.s && line.e === value.e) || 
                    unique.some(line => line.s === reversedLine.s && line.e === reversedLine.e)
                ) {
                    duplicates.push(value);
                    duplicates.push(reversedLine);
                } else {
                    unique.push(value);
                }
            }
            unique = unique.filter(value => !duplicates.some(line => 
                (line.s === value.s && line.e === value.e) || 
                (line.s === value.e && line.e === value.s)
            ));
            edges = unique;

            for (let j=0; j <edges.length; j++) {
                let newTri = new Triangle(edges[j].s, edges[j].e, i);
                this.triangles.push(newTri);
            }
        }

        for(let i=this.triangles.length - 1; i>=0; i--) {
            if(this.triangles[i].a == 0 || this.triangles[i].a == 1 || this.triangles[i].a == 2 ||
                this.triangles[i].b == 0 || this.triangles[i].b == 1 || this.triangles[i].b == 2 ||
                this.triangles[i].c == 0 || this.triangles[i].c == 1 || this.triangles[i].c == 2) {
                    this.triangles.splice(i, 1);
            }
            this.triangles[i].color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
        }
    }

    randomPoints() {
        return new Vector(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
    }

    checkCircumscriber(t, x) {
        const circumcenter = new Vector().circumcenter(this.points[t.a], this.points[t.b], this.points[t.c]);

        if(new Vector().distance(x, circumcenter.v) <= circumcenter.r){
            return true;
        }

        return false;
    }

    animate(ctx) {
        ctx.strokeStyle = '#000000';
        
        for(let i=0; i<this.triangles.length; i++) {
            ctx.fillStyle = this.triangles[i].color;
            ctx.beginPath();
            ctx.moveTo(this.points[this.triangles[i].a].x, this.points[this.triangles[i].a].y);
            ctx.lineTo(this.points[this.triangles[i].b].x, this.points[this.triangles[i].b].y);
            ctx.lineTo(this.points[this.triangles[i].c].x, this.points[this.triangles[i].c].y);
            ctx.lineTo(this.points[this.triangles[i].a].x, this.points[this.triangles[i].a].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill()
        }
        
        // for(let i=3; i<LAST; i++) {
        //     ctx.beginPath();
        //     ctx.arc(this.points[i].x, this.points[i].y, 10, 0, Math.PI * 2);
        //     ctx.closePath();
        //     ctx.stroke();
        //     ctx.fillText(String(i), this.points[i].x, this.points[i].y);
        // }
    }
}
