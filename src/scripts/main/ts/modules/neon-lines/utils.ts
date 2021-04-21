function calculateCoords(ctx: CanvasRenderingContext2D) {
  const lineLength = 30;
  let angle = 0;
  // const yStep = lineLength * Math.sqrt(3) / 2; // Шаг координаты по оси Y
  // const xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y

  let startX = 500;
  let startY = 500;

  ctx.beginPath();
  ctx.moveTo(startX, startY);

  // ctx.lineTo(x, y);

  for (let j = 0; j <= 50; j++) {
    const yStep = lineLength * Math.cos((angle * Math.PI) / 180); // Шаг координаты по оси Y
    const xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y
    const x = startX + xStep;
    const y = startY + yStep;
    ctx.lineTo(x, y);
    angle += 60;
  }

  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.closePath();
}

export { calculateCoords };
