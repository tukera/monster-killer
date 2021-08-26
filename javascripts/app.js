const monsterGame = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  hero: {
    x: 250,
    y: 250,
    w: 35,
    h: 35,
    speed: 4,
  },
  monster: {
    x: 32 + Math.random() * (canvas.width - 64),
    y: 32 + Math.random() * (canvas.height - 64),
    w: 35,
    h: 35,
  },
  monstersKill: 0,
  keysDown: {},
  count: 20,
  finished: false,
  monsterReady: true,
  heroReady: true,

  timer() {
    setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.count);
        this.finished = true;
        this.count = 0;
        this.monsterReady = false;
        this.heroReady = false;
      }
    }, 1000);
  },

  init(canvas) {
    this.setCanvas(canvas);
    this.setAudio();
    this.heroImage = new Image();
    this.heroImage.src = './images/hero.png';
    this.monsterImage = new Image();
    this.monsterImage.src = './images/monster.png';
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

  setAudio() {
    this.audio = new Audio();
    this.audio.src = './audio/battle.mp3';
    this.audio.play();
  },

  setmonsterAudio() {
    this.monsterAudio = new Audio();
    this.monsterAudio.src = './audio/monster.ogg';
    this.monsterAudio.play();
  },

  sethitAudio() {
    this.hitAudio = new Audio();
    this.hitAudio.src = './audio/hit.ogg';
    this.hitAudio.play();
  },

  setListeners() {
    document.addEventListener(
      'keydown',
      key => {
        this.keysDown[key.keyCode] = true;
      },
      false
    );

    document.addEventListener(
      'keyup',
      key => {
        delete this.keysDown[key.keyCode];
      },
      false
    );
  },

  gameStart() {
    this.intervalId = setInterval(() => {
      this.checkIfCollision();
      this.clearCanvas();
      this.renderAll();
      this.update();
    }, 1000 / 60);
  },

  renderAll() {
    this.drawBackground();
    this.drawMonster();
    this.drawHero();
    this.showScores();
  },

  reset() {
    this.setmonsterAudio();
    this.monster.x = 32 + Math.random() * (canvas.width - 64);
    this.monster.y = 32 + Math.random() * (canvas.height - 64);
  },

  update() {
    if (38 in this.keysDown) {
      this.hero.y -= this.hero.speed;
    }
    if (40 in this.keysDown) {
      this.hero.y += this.hero.speed;
    }
    if (37 in this.keysDown) {
      if (this.hero.x !== 0) {
        this.hero.x -= this.hero.speed;
      } else {
        null;
      }
    }
    if (39 in this.keysDown) {
      this.hero.x += this.hero.speed;
    }
    console.log(this.keyCode);
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

  drawHero() {
    if (this.heroReady) {
      this.ctx.drawImage(
        this.heroImage,
        this.hero.x,
        this.hero.y,
        this.hero.w,
        this.hero.h
      );
    }
  },

  drawMonster() {
    if (this.monsterReady) {
      this.ctx.drawImage(
        this.monsterImage,
        this.monster.x,
        this.monster.y,
        this.monster.w,
        this.monster.h
      );
    }
  },

  clearCanvas() {
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
      this.ctx.fillText('Time out!', 200, 220);
    }
  },

  checkIfCollision() {
    if (
      this.hero.x <= this.monster.x + 32 &&
      this.monster.x <= this.hero.x + 32 &&
      this.hero.y <= this.monster.y + 32 &&
      this.monster.y <= this.hero.y + 32
    ) {
      this.sethitAudio();
      ++this.monstersKill;
      this.reset();
    }
  },
};
