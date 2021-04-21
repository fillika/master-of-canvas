import { drawHexagon, drawLine } from './draw-fns';

function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('neon-lines');

  if (!canvas) return;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  const parent = canvas.parentElement;

  //set styles
  if (parent) {
    const parentWidth = parent.getBoundingClientRect().width;
    const parentHeight = parent.getBoundingClientRect().height;
    canvas.width = parentWidth;
    canvas.height = parentHeight;
  }

  // draw simple line

  drawLine(canvas, ctx);
  // drawHexagon(canvas, ctx);
}

init();
window.addEventListener('resize', init);
