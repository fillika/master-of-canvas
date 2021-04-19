import { Particle } from './Particle';

function createImage(src: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const image1 = new Image();
  image1.src = src;

  image1.addEventListener('load', () => {
    let particlesArray = [];
    const numberOfParticles = 5000;

    // Создаем частицы
    for (let k = 0; k < numberOfParticles; k++) {
      particlesArray.push(new Particle(canvas, ctx));
    }

    animate(canvas, ctx, particlesArray, image1);
  });
}

function animate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  particlesArray: Particle[],
  image: HTMLImageElement
) {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let k = 0; k < particlesArray.length; k++) {
    const element = particlesArray[k];
    element.update();
    element.draw();
  }

  requestAnimationFrame(() => animate(canvas, ctx, particlesArray, image));
}

/**
 * Функция усредняет значения, делая серыми пикселями.
 * В целом, добавление чисел для red, green, blue, позволит управлять цветами
 * https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 */
function grayscale(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
}

export { createImage, grayscale };
