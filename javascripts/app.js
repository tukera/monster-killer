const monsterGame = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  counterInterval: undefined,
  speed: 4,
  monstersKill: 0,
  count: 20,
  finished: false,
  keysDown: {},

  setRestart() {
    this.count = 20;
    this.init(canvas);
  },

  init(canvas) {
    this.setCanvas(canvas);
    this.createNewHero();
    this.createNewMonster();
    this.backgroundImage = new Image();
    this.backgroundImage.src = './images/background.png';
    this.setListeners();
    this.timer();
    this.gameStart();
  },

  setCanvas(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvasSize.w = 500;
    this.canvasSize.h = 500;
    canvas.setAttribute('width', this.canvasSize.w);
    canvas.setAttribute('height', this.canvasSize.h);
  },

  createNewHero() {
    this.newHero = new Hero(this.ctx, 32, 37, this.canvasSize, this.speed);
  },

  createNewMonster() {
    this.newMonster = new Monster(this.ctx, 32, 32, this.canvasSize);
  },

  setAudio() {
    this.audio = new Audio();
    this.audio.src = './audio/battle.mp3';
    this.audio.play();
  },

  setListeners() {
    document.addEventListener(
      'keydown',
      key => {
        this.newHero.keysDown[key.keyCode] = true;
      },
      false
    );

    document.addEventListener(
      'keyup',
      key => {
        delete this.newHero.keysDown[key.keyCode];
      },
      false
    );
  },

  timer() {
    this.counterInterval = setInterval(() => {
      this.count -= 1;
      if (this.count < 0) {
        this.count = 0;
        clearInterval(this.counterInterval);
        this.setGameover();
      }
    }, 1000);
  },

  gameStart() {
    this.intervalId = setInterval(() => {
      this.checkIfCollision();
      this.clearCanvas();
      this.renderAll();
      this.newHero.update();
    }, 1000 / 60);
  },

  setGameover(canvas) {
    clearInterval(this.intervalId);
    this.clearCanvas();
    this.ctx.fillStyle = 'white';
    this.ctx.font = '25px Verdana';
    this.ctx.fillText('Time out!', 190, 50);
    this.ctx.fillText('Your Score is: ' + this.monstersKill, 150, 150);
  },

  renderAll() {
    this.drawBackground();
    this.newHero.draw();
    this.newMonster.draw();
    this.showScores();
  },

  drawBackground() {
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  },

  clearCanvas(canvas) {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  showScores() {
    this.ctx.font = '25px Verdana';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText('Monsters kill: ' + this.monstersKill, 20, 20);
    this.ctx.fillText('Time: ' + this.count, 20, 50);
    if (this.finished == true) {
      this.setRestart(canvas);
    }
  },

  checkIfCollision() {
    if (
      this.newHero.heroPosition.x <= this.newMonster.monsterPosition.x + 32 &&
      this.newMonster.monsterPosition.x <= this.newHero.heroPosition.x + 32 &&
      this.newHero.heroPosition.y <= this.newMonster.monsterPosition.y + 32 &&
      this.newMonster.monsterPosition.y <= this.newHero.heroPosition.y + 32
    ) {
      this.newHero.playAudio();
      ++this.monstersKill;
      this.newMonster.update();
    }
  },
};
