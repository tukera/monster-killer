class Monster {
  constructor(ctx, width, height, canvasSize) {
    this.ctx = ctx;
    this.monsterSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.image = undefined;
    this.monsterPosition = {
      x:
        this.monsterSize.w +
        Math.random() * (this.canvasSize.w - this.monsterSize.w),
      y:
        this.monsterSize.h +
        Math.random() * (this.canvasSize.h - this.monsterSize.h),
    };
    this.image = new Image();
    this.image.src = './images/monster.png';
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.monsterPosition.x,
      this.monsterPosition.y,
      this.monsterSize.w,
      this.monsterSize.h
    );
  }

  playAudio() {
    this.audio = new Audio();
    this.audio.src = './audio/monster.ogg';
    this.audio.play();
  }

  update() {
    this.playAudio();
    (this.monsterPosition.x =
      this.monsterSize.w +
      Math.random() * (this.canvasSize.w - this.monsterSize.w)),
      (this.monsterPosition.y =
        this.monsterSize.h +
        Math.random() * (this.canvasSize.h - this.monsterSize.h));
  }
}
