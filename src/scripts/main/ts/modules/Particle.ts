class Particle {
  x: number;
  y: number;
  speed: number;
  velocity: number;
  size: number;
  position1: number;
  position2: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mappedImage: (number | string)[][][];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mappedImage: (number | string)[][][]) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mappedImage = mappedImage;
    this.x = Math.random() * this.canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = Math.random() * 1.2;
    this.size = Math.random() * 1.5 + 1;
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
  }

  update() {
    const speed = this.mappedImage[this.position1][this.position2][0];
    if (typeof speed === 'number') {
      this.speed = speed;
    }
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 2.5 - this.speed + this.velocity;

    this.y += movement;
    this.x += movement;

    if (this.y >= this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }

    if (this.x >= this.canvas.width) {
      this.x = 0;
      this.y = Math.random() * this.canvas.height;
    }
  }

  draw() {
    const [, color] = this.mappedImage[this.position1][this.position2];
    if (typeof color === 'string') {
      this.ctx.fillStyle = color;
    } else {
      this.ctx.fillStyle = 'white';
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export { Particle };
