class World {
  character = new Character();
  level = levelVariable;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusbar = new HealthStatusbar();
  bottleStatusbar = new BottleStatusbar();
  coinsStatusbar = new CoinsStatusbar();
  throwableObjects = [new ThrowableObject()];
  endBoss = new Endboss();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.directCollisionsWithChickens();
      this.checkCollisionWithCoins();
      this.checkCollisionsWithChickensFromTop();
      this.checkCollisionWithBottles();
      this.checkBottleCollisionWithEndboss();
    }, 50);
  }

  checkBottleCollisionWithEndboss() {
    if (this.keyboard.KeyD) {
      let bottle = new ThrowableObject(
        this.character.x,
        this.character.y + 125
      );
      this.throwableObjects.push(bottle);
      this.keyboard.KeyD = false;
      console.log(bottle);
      if (this.endBoss.isColliding(bottle)) {
        endBoss.move();
      } else {
        return;
      }
      console.log(endBoss);
    }
  }

  checkCollisionsWithChickensFromTop() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        enemy.isDead();
        enemy.y = 450;
      }
    });
  }

  checkCollisionWithBottles() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        let bottlesPerc = this.bottleStatusbar.percentage;

        if (bottlesPerc < 100) {
          bottlesPerc += 12.5;
        }
        this.bottleStatusbar.setBottlePercentage(bottlesPerc);
        this.level.bottles.splice(i, 1);
      }
    });
  }
  checkCollisionWithCoins() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        let coinsPerc = this.coinsStatusbar.percentage;

        if (coinsPerc < 100) {
          coinsPerc += 12.5;
        }
        this.coinsStatusbar.setCoinsPercentage(coinsPerc);
        this.level.coins.splice(i, 1);
      }
    });
  }

  directCollisionsWithChickens() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !this.character.isAboveGround()
      ) {
        this.healthStatusbar.setPercentage(this.character.health);
        this.character.isCharacterHurt();
        enemy.chicken_sound.play();
      }
    });
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addAllObjToCanvas(this.level.backgrounds);
    this.addAllObjToCanvas(this.level.clouds);
    this.addAllObjToCanvas(this.level.enemies);
    this.addAllObjToCanvas(this.level.bottles);
    this.addAllObjToCanvas(this.level.coins);

    this.addAllObjToCanvas(this.throwableObjects);
    this.addSingleObjToCanvas(this.character);
    this.addSingleObjToCanvas(this.endBoss);

    this.ctx.translate(-this.camera_x, 0);
    this.addSingleObjToCanvas(this.healthStatusbar);
    this.addSingleObjToCanvas(this.bottleStatusbar);
    this.addSingleObjToCanvas(this.coinsStatusbar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addAllObjToCanvas(objects) {
    objects.forEach((obj) => {
      this.addSingleObjToCanvas(obj);
    });
  }

  addSingleObjToCanvas(obj) {
    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.x *= -1;
    }
    this.ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    obj.drawFrame(this.ctx);

    if (obj.otherDirection) {
      this.ctx.restore();
      obj.x *= -1;
    }
  }
}
