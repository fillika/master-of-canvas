import { Particle } from './utils2';
import { drawText } from './utils2';

canvasInit();

export type mouseObj = {
  x: null | number;
  y: null | number;
  radius: number;
};

function canvasInit() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas2');

  if (!canvas) return;

  const msg = 'ITSOFT';
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawText(canvas, ctx, msg);

  ctx.beginPath();
  ctx.stroke();
  // get data
  const data = ctx.getImageData(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);

  const particleArray = [];

  //handle mouse

  const mouse: mouseObj = {
    x: null,
    y: null,
    radius: 75,
  };

  for (let k = 0; k < 400; k++) {
    const x = Math.round(Math.random() * canvas.width);
    const y = Math.round(Math.random() * canvas.height);
    particleArray.push(new Particle(x, y, canvas, ctx, mouse));
  }

  animate(canvas, ctx, particleArray);

  window.addEventListener('mousemove', e => mousemove(e, mouse));
}

function mousemove(event: MouseEvent, mouse: mouseObj) {
  mouse.x = event.x;
  mouse.y = event.y;
}

function animate(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, particleArray: Particle[]) {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  for (let j = 0; j < particleArray.length; j++) {
    const particle = particleArray[j];
    particle.draw();
    particle.update();
  }

  requestAnimationFrame(() => animate(canvas, ctx, particleArray));
}
