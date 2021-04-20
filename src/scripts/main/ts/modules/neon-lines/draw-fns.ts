function drawLine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  let startX = canvas.width / 2;
  let startY = canvas.height / 2;

  const angle = 60;
  const lineLength = 50;
  // Найти угол
  const sin60 = Math.sin((angle * Math.PI) / 180); // Синус угла в 60 deg

  const x = Math.round(sin60 * lineLength);
  const y = Math.round(Math.sqrt(lineLength * lineLength - x * x));
  const coords = [];

  console.log(x);
  console.log(y);

  for (let k = 0; k < 25; k++) {
    const random = Math.random() > 0.5;

    if (random) {
      startX += x;
    } else {
      startX -= x;
    }

    coords.push([startX, startY]);
  }

  // ctx.beginPath();
  ctx.moveTo(startX, startY);

  for (let j = 0; j < coords.length; j++) {
    const [x, y] = coords[j];
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = '#fff';
  ctx.stroke();
  // ctx.closePath();
}

function drawHexagon(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  var numberOfSides = 6,
    size = 20,
    Xcenter = canvas.width / 2 - size * 2,
    Ycenter = canvas.height / 2;

  ctx.beginPath();
  ctx.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

  // for (var i = 1; i <= numberOfSides; i += 1) {
  //   ctx.lineTo(
  //     Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
  //     Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
  //   );
  // }
  let i = 1;

  let x = Xcenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides);
  let y = Ycenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides);

  ctx.lineTo(x, y);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.stroke();
}

export { drawLine, drawHexagon };
