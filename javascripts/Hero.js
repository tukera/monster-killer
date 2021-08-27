class Hero {
  constructor(ctx, width, height, canvasSize, speed) {
    this.ctx = ctx;
    this.heroSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.image = undefined;
    this.heroPosition = {
      x: this.canvasSize.w / 2,
      y: this.canvasSize.h / 2,
    };
    this.image = new Image();
    this.image.src = './images/hero.png';
    this.speed = speed;
    this.keysDown = {};
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.heroPosition.x,
      this.heroPosition.y,
      this.heroSize.w,
      this.heroSize.h
    );
  }

  playAudio() {
    this.audio = new Audio();
    this.audio.src = './audio/hit.ogg';
    this.audio.play();
  }

  update() {
    if (38 in this.keysDown) {
      this.heroPosition.y -= this.speed;
    }
    if (40 in this.keysDown) {
      this.heroPosition.y += this.speed;
    }
    if (37 in this.keysDown) {
      this.heroPosition.x -= this.speed;
    }
    if (39 in this.keysDown) {
      this.heroPosition.x += this.speed;
    }
  }
}
