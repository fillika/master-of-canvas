import { Particle } from './Particle';

function createImage(src: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const image1 = new Image();
  image1.src = src;

  const particlesArray = createParticlesArray(canvas, ctx, 5000);

  image1.addEventListener('load', () => {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const mappedImage = createMappedImage(canvas, ctx);

    console.log(mappedImage);

    // -----

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

function createParticlesArray(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  numberOfParticles: number
): Particle[] {
  const particlesArray = [];

  // Создаем частицы
  for (let k = 0; k < numberOfParticles; k++) {
    particlesArray.push(new Particle(canvas, ctx));
  }
  return particlesArray;
}

function calcRelativeBrightness(r: number, g: number, b: number) {
  return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114) / 100;
}

function createMappedImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): number[][][] {
  // Получем пиксели
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const mappedImage = [];

  /**
   * Для начала Я прохожу по каждому ряду. (высота canvas)
   * Все для того, чтобы получить массив элементов с яркостью (brightness) каждого пикселя
   */
  for (let y = 0; y < canvas.height; y++) {
    let row = [];

    for (let x = 0; x < canvas.width; x++) {
      const red = pixels.data[y * 4 * pixels.width + x * 4];
      const green = pixels.data[y * 4 * pixels.width + x * 4 + 1];
      const blue = pixels.data[y * 4 * pixels.width + x * 4 + 2];
      const brightness = calcRelativeBrightness(red, green, blue);

      const cell = [brightness];

      row.push(cell);
    }

    mappedImage.push(row);
  }

  return mappedImage;
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
