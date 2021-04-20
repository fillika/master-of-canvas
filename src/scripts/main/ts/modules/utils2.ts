import { mouseObj } from './canvas2';

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouse: mouseObj;

  constructor(x: number, y: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, mouse: mouseObj) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  update() {
    if (this.mouse.x && this.mouse.y) {
      const dx = this.mouse.x - this.x;
      const dy = this.mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = this.mouse.radius;
      const force = (maxDistance - distance) / maxDistance; // Сила, с которой частицы двигаются
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      if (distance < this.mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 10
        }
      }
    }
  }
}

function drawText(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, msg: string) {
  ctx.font = 'italic 24px Arial';
  ctx.fillStyle = '#fff';
  const text = ctx.measureText(msg);
  ctx.fillText(msg, canvas.width / 2 - text.width / 2, canvas.height / 2);
}

export { Particle, drawText };
