function calculateCoords(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: string = '#bbb') {
  const lineLength = 15;
  let angle = Math.random() < 0.5 ? -60 : 60;
  let startX = canvas.width / 2;
  let startY = canvas.height / 2;
  /**
   * У нас каждый тик - это отдельно рисующийся штрих. И prev нужен, чтобы мы рисовали каждый тик с того места
   * где закончили рисовать предыдущий
   */
  let resultX = startX;
  let resultY = startY;
  let prevX = startX; // Чтобы новая полоса продолжалась с предыдущего места
  let prevY = startY; // Чтобы новая полоса продолжалась с предыдущего места

  drawOneTick();

  // drawTicks(1);

  function drawTicks(ticks: number = 20) {
    ctx.beginPath();

    for (let j = 0; j <= ticks; j++) {
      const yStep = lineLength * Math.cos((angle * Math.PI) / 180); // Шаг координаты по оси Y
      const xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y
      const x = (resultX = resultX + xStep);
      const y = (resultY = resultY + yStep);
      ctx.lineTo(x, y);
      angle += Math.random() < 0.5 ? 60 : -60;
    }

    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }

  function drawOneTick() {
    ctx.beginPath();

    let yStep = lineLength * Math.cos((angle * Math.PI) / 180); // Шаг координаты по оси Y
    let xStep = lineLength * Math.sin((angle * Math.PI) / 180); // Шаг координаты по оси Y
    let x = (resultX += xStep);
    let y = (resultY += yStep);

    // TODO Сделать ограничение, чтобы линия не уходила за край
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    angle += Math.random() < 0.5 ? 60 : -60;

    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

    prevX = x;
    prevY = y;

    requestAnimationFrame(drawOneTick);
  }
}

export { calculateCoords };
