class Hexagon {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color: string;
  lineLength: number;
  stepLength: number;
  randomForAngle: boolean;
  angle: number;
  startX: number;
  startY: number;
  resultX: number;
  resultY: number;
  prevX: number;
  prevY: number;
  abc: number;
  xStep: number;
  yStep: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, color: string = 'yellow') {
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = color;
    this.lineLength = 30;
    this.stepLength = 1;
    this.randomForAngle = Math.random() > 0.5;
    this.angle = this.randomForAngle ? 60 : -60;
    this.startX = this.canvas.width / 2;
    this.startY = this.canvas.height / 2;
    this.resultX = this.startX;
    this.resultY = this.startY;
    this.prevX = this.startX;
    this.prevY = this.startY;
    this.abc = 2;
    this.xStep = this.lineLength * Math.sin((this.angle * Math.PI) / 180);
    this.yStep = this.lineLength * Math.cos((this.angle * Math.PI) / 180);
    this.x = this.startX;
    this.y = this.startY;
    this.targetX = this.resultX + this.xStep;
    this.targetY = this.resultY + this.xStep;
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.x, this.y);

    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update() {
    this.yStep = this.lineLength * Math.cos((this.angle * Math.PI) / 180);
    this.xStep = this.lineLength * Math.sin((this.angle * Math.PI) / 180);
    this.y = this.resultY + this.yStep;
    this.x = this.resultX + this.xStep;

    while (this.y >= this.canvas.height || this.y <= 0 || this.x >= this.canvas.width || this.x <= 0) {
      if (this.randomForAngle) {
        this.angle += -120;
      } else {
        this.angle += 120;
      }

      this.yStep = this.lineLength * Math.cos((this.angle * Math.PI) / 180);
      this.xStep = this.lineLength * Math.sin((this.angle * Math.PI) / 180);
      this.y = this.resultY + this.yStep;
      this.x = this.resultX + this.xStep;
    }

    this.draw();

    this.prevX = this.resultX = this.x;
    this.prevY = this.resultY = this.y;

    this.randomForAngle = Math.random() > 0.5;
    this.angle += this.randomForAngle ? 60 : -60;
  }
}

export { Hexagon };
