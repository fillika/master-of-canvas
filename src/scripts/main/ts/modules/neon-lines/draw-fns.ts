import { calculateCoords } from "./utils";

function drawLine(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  calculateCoords(canvas, ctx, 'red');
  // calculateCoords(canvas, ctx, 'green');
  // calculateCoords(canvas, ctx, 'green');
  // calculateCoords(canvas, ctx, 'blue');
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
