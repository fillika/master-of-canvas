import { pumpkinImg } from './pumpkin-img';
const img = new Image();
img.src = pumpkinImg;

class Particle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  spin: number;
  pumpkin: string;
  frameX: number;
  frameY: number;
  spriteSize: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 100 + 50;
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * 360;
    this.spin = Math.random() < 0.5 ? -1 : 1;
    this.pumpkin = pumpkinImg;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 900 / 3;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle * (Math.PI / 360) * this.spin);
    // this.ctx.drawImage(img, 0 - this.size / 2, 0 - this.size / 2, this.size * 3, this.size * 3);
    this.ctx.drawImage(
      img,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      0 - this.size / 2,
      0 - this.size / 2,
      this.size,
      this.size
    );
    this.ctx.restore();
  }

  update() {
    this.y += this.speed;
    this.angle += Math.random() * 4 + 1;
    if (this.y > this.canvas.height) {
      this.y = 0 - this.size;
    }
  }
}

function initPumpkins() {
  const canvas = <HTMLCanvasElement>document.getElementById('pumpkins');

  if (!canvas) return;

  const particlesCount = 75;
  const particlesArray = [];

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  setCanvasStyles(canvas, ctx);

  for (let index = 0; index < particlesCount; index++) {
    particlesArray.push(new Particle(canvas, ctx));
  }

  animate(canvas, ctx, particlesArray);
}

function setCanvasStyles(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, particlesArray: Particle[]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let j = 0; j < particlesArray.length; j++) {
    particlesArray[j].update();
    particlesArray[j].draw();
  }

  requestAnimationFrame(() => animate(canvas, ctx, particlesArray));
}

initPumpkins();
