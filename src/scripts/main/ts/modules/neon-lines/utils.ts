function calculateCoords(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const lineLength = 30;
  let angle = 0;
  // const yStep = lineLength * Math.sqrt(3) / 2; // Шаг координаты по оси Y
  // const xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y

  let startX = canvas.width / 2;
  let startY = canvas.height / 2;
  let resultX = startX;
  let resultY = startY;

  ctx.beginPath();

  for (let j = 0; j <= 50; j++) {
    const yStep = lineLength * Math.cos((angle * Math.PI) / 180); // Шаг координаты по оси Y
    const xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y
    const x = resultX = resultX + xStep;
    const y = resultY = resultY + yStep;
    ctx.lineTo(x, y);
    angle += Math.random() < 0.5 ? 60 : -60;
  }

  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.closePath();
}

export { calculateCoords };
