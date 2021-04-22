import { Hexagon } from './Hexagon';

function init() {
  const canvas = <HTMLCanvasElement>document.getElementById('neon-lines');

  if (!canvas) return;

  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  const parent = canvas.parentElement;

  if (parent) {
    const parentWidth = parent.getBoundingClientRect().width;
    const parentHeight = parent.getBoundingClientRect().height;
    canvas.width = parentWidth;
    canvas.height = parentHeight;
  }

  const linesArray = ['red', 'green', 'blue', 'yellow'];
  const hexagonArray: Hexagon[] = [];
  linesArray.forEach(color => hexagonArray.push(new Hexagon(canvas, ctx, color)));

  canvasInit();

  function canvasInit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //set styles
    if (parent) {
      const parentWidth = parent.getBoundingClientRect().width;
      const parentHeight = parent.getBoundingClientRect().height;
      canvas.width = parentWidth;
      canvas.height = parentHeight;
    }
  }

  animate();

  function animate() {
    for (let l = 0; l < hexagonArray.length; l++) {
      hexagonArray[l].update();
    }

    requestAnimationFrame(animate);
  }

  const fnDebounced = debounce(canvasInit, 1000);
  window.addEventListener('resize', fnDebounced);
}

init();

function debounce(f: any, ms: number) {
  let isCountDown = false;

  return function (this: any) {
    if (isCountDown) return;

    f.apply(this, arguments);

    isCountDown = true;

    setTimeout(() => (isCountDown = false), ms);
  };
}
