class RoundButton {
  constructor(
    ctx,
    posX,
    posY,
    width,
    height,
    radius,
    lineW,
    color,
    mousex,
    mousey
  ) {
    this.ctx = ctx;
    this.x = posX;
    this.y = posY;
    this.w = width;
    this.h = height;
    this.radius = radius;
    this.r = posX + width;
    this.b = posY + height;
    this.lineW = lineW;
    this.color = color;
    this.xmouse = mousex;
    this.ymouse = mousey;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineW;
    this.ctx.moveTo(this.x + this.radius, this.y);
    this.ctx.lineTo(this.r - this.radius, this.y);
    this.ctx.quadraticCurveTo(this.r, this.y, this.r, this.y + this.radius);
    this.ctx.lineTo(this.r, this.y + this.h - this.radius);
    this.ctx.quadraticCurveTo(this.r, this.b, this.r - this.radius, this.b);
    this.ctx.lineTo(this.x + this.radius, this.b);
    this.ctx.quadraticCurveTo(this.x, this.b, this.x, this.b - this.radius);
    this.ctx.lineTo(this.x, this.y + this.radius);
    this.ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
    this.ctx.stroke();
  }

  changeColor(newColor) {
    this.color = newColor;
    this.draw();
  }
}



