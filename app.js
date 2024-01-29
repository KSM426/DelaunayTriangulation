import { DelaunayTriangulation } from "./DelaunayTriangulation.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.DelaunayTriangulation = new DelaunayTriangulation();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.DelaunayTriangulation.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.DelaunayTriangulation.animate(this.ctx);
    }
}

window.onload = () => {
    new App();
}

// 점을 다 찍고 삼각형을 그리는 것은 조금 복잡하고 예외가 많음
// 삼각형 하나가 있고 여러 개의 삼각형을 추가하는 알고리즘은 고려할게 너무 많음
// 삼각형 하나를 그리면 구역이 7개가 생기므로 경우가 너무 많음

// 점을 찍으면서 동시에 삼각형을 그림
// Delaunay triangulation을 이용해서 그림
// Incremental 알고리즘 사용