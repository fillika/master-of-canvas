import { imgValheim } from '../blocks/images';
import { createImage } from './utils';

initCanvas();

function initCanvas() {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas1');

  if (canvas) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const dpi = 2;
    canvas.width = 640 * dpi;
    canvas.height = 360 * dpi;

    createImage(imgValheim, canvas, ctx);
  }
}
