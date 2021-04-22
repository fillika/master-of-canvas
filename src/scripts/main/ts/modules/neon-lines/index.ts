import { Hexagon } from './Hexagon';

function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('neon-lines');

  if (!canvas) return;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  const parent = canvas.parentElement;

  const linesArray = ['red', 'green', 'blue', 'yellow'];
  //set styles
  if (parent) {
    const parentWidth = parent.getBoundingClientRect().width;
    const parentHeight = parent.getBoundingClientRect().height;
    canvas.width = parentWidth;
    canvas.height = parentHeight;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let l = 0; l < linesArray.length; l++) {
    const h = new Hexagon(canvas, ctx, linesArray[l]);

    animate();

    function animate() {
      h.update();
      requestAnimationFrame(animate);
    }
  }
}

init();
window.addEventListener('resize', init);
