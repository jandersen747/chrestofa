class Canvas {
    constructor(canvasId, color) {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.color = color;
        this.prep();
    }
    prep() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getContext() {
        return this.context;
    }
    getHeight() {
        return this.canvas.height;
    }
    getWidth() {
        return this.canvas.width;
    }
};

class Umo {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.r = Math.random() * 9 + 3;
        this.x = Math.random() * (this.canvas.getWidth() - this.r - 2);
        this.y = Math.random() * (this.canvas.getHeight() - this.r - 2);
        this.dx = Math.random() * 3;
        this.dy = Math.random() * 3;
        this.color = color;
    }

    draw() {
        this.canvas.getContext().beginPath();
        this.canvas.getContext().strokeStyle = '#222';
        this.canvas.getContext().fillStyle = this.color;
        this.canvas.getContext().arc(this.x, this.y, this.r,
                                     0, Math.PI * 2,
                                     false);
        this.canvas.getContext().fill();
        this.canvas.getContext().stroke();
        this.canvas.getContext().closePath();
    }

    move() {
        if (this.x + this.dx + this.r > this.canvas.getWidth()
                || this.x + this.dx - this.r < 0)
              this.dx = -this.dx;
        if (this.y + this.dy + this.r > this.canvas.getHeight()
                || this.y + this.dy - this.r < 0)
              this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
    }

}

var arr = [];
var canvas = document.getElementById('canvas');

const redraw = function () {
    canvas.clear();     // clear canvas
    canvas.prep();      // prep canvas with background color
    for (let umo of arr) {
        umo.move();  // change coordinates
        umo.draw();  // draw again with new coordinates
    }
}

const repeater = function () {
    setInterval(redraw, 10);
}

const moveit = function () {
    canvas = new Canvas('canvas', '#ffff88');
    let c0 = new Umo(canvas, '#000088');
    arr.push(c0);
    c0 = new Umo(canvas, '#cc0000');
    arr.push(c0);
    c0 = new Umo(canvas, '#009900');
    arr.push(c0);
    c0 = new Umo(canvas, '#003300');
    arr.push(c0);
    c0 = new Umo(canvas, '#000000');
    arr.push(c0);
    c0 = new Umo(canvas, '#f3f0f3');
    arr.push(c0);
    c0 = new Umo(canvas, '#b5b5b5');
    arr.push(c0);
    repeater();
}

window.addEventListener('load', moveit);