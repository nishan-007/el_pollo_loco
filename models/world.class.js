class World extends DrawWorld {

  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  slowInterval;
  fastInterval;
  character = new Character();
  endboss = new Endboss();
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusbarBottle();
  statusBarEndboss = new StatusbarEndboss();
  throwableObject = [];
  deadEnemies = [];
  thrownBottle = [];
  collectedBottles = 0;
  level = level1;
  levelEnd;
  characterLastMovement = 0;
  soundthrow = new Audio('audio/throw.mp3')
  soundCollectCoin = new Audio('audio/coin.mp3');
  soundCollectBottle = new Audio('audio/jump.mp3');
  soundCollectHeart = new Audio('audio/heart.mp3');
  soundBrokenBottle = new Audio('audio/splash.mp3');
  soundDeadChicken = new Audio('audio/small-chicken.mp3');
  soundDeadBabyChicken = new Audio('audio/chicken.mp3');
  soundEndboss = new Audio('audio/attack.mp3');
  soundWon = new Audio('audio/win.mp3');
  soundLost = new Audio('audio/game-over.mp3');
  music = new Audio('audio/background-sound2.mp3');

  gameOver = new Endscreen('img/9_intro_outro_screens/game_over/game over.png', this.character.x - 120);
  lost = new Endscreen('img/9_intro_outro_screens/game_over/you lost.png', this.character.x - 120);

  constructor(canvas, keyboard) {
      super();
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.ctx = canvas.getContext('2d');
      super.drawWorld();
      this.setWorld();
      this.run();
      this.playMusic();
  }

  /**
   * creating the world
   */
  setWorld() {
      this.character.world = this;
      this.endboss.world = this;
  }

  
  run() {
      this.slowInterval = setInterval(() => this.slowIntervalAction(), 300);
      this.fastInterval = setInterval(() => this.fastIntervalAction(), 1000 / 60);
  }

  /**
   * slow functions
   */
  slowIntervalAction() {
      this.checkThrowObjects();
      this.checkCollisionEnemy();
      this.checkCollisionEndboss();
      this.setLevelEnd();
  }

  /**
   *  fast functions
   */
  fastIntervalAction() {
      this.checkCollisionItems();
      this.checkJumpOnEnemy();
      this.checkJumpOnSmallEnemy();
      this.fightEndboss();
      this.endOfGame();
  }

  /**
   * level is ending 
   */
  setLevelEnd() {
      this.levelEnd = this.endboss.x;
  }

  /**
   * playing sound 
   */
  playSound(sound, volume) {
      if (soundOn()) {
          sound.play();
          sound.volume = volume;
      } else {
          this.pauseSound(sound);
      }
  }

  /**
   * pausing sound 
   */
  pauseSound(sound) {
      sound.pause();
      sound.volume = 0;
  }

  /**
   * playing music
   */
  playMusic() {
      if (musicOn()) {
          this.music.play();
          this.music.volume = 0.1;
      } else {
          this.pauseMusic();
      }
  }

  /**
   * pausing music
   */
  pauseMusic() {
      this.music.pause();
      this.music.volume = 0;
  }

  /**
   * the strength of the different enemies
   */
  checkCollisionEnemy() {
      this.level.enemies.forEach((enemy) => this.collision(enemy, 5));
      this.level.smallEnemies.forEach((enemy) => this.collision(enemy, 2));
  }

  /**
   * character loses health 
   */
  collision(enemy, damage) {
      if (this.character.isColliding(enemy) && !this.endboss.endGame) {
          this.character.hit(damage);
          this.statusBarHealth.setPercentage(this.character.energy);
      }
  }

  /**
   * colliding with the endboss
   */
  checkCollisionEndboss() {
      if (this.canCollidEndboss()) {
          this.endboss.attack = true;
          this.character.hit(10);
          this.statusBarHealth.setPercentage(this.character.energy);
      } else {
          this.endboss.attack = false;
      }
  }

  /**
   * character collid with endboss
   */
  canCollidEndboss() {
      return this.character.reachedEndboss(this.endboss, 50) &&
          !this.endboss.isDead();
  }

  /**
   *  jumping on enemy
   */
  checkJumpOnEnemy() {
      this.level.enemies.forEach((enemy) => {
          if (this.canJumpOnEnemy(enemy))
              this.deadEnemy(enemy);
      });
  }

  /**
   *  jumping on smallEnemy
   */
  checkJumpOnSmallEnemy() {
      this.level.smallEnemies.forEach((enemy) => {
          if (this.canJumpOnEnemy(enemy))
              this.deadSmallEnemy(enemy);
      });
  }

  /**
   * jump on enemies by colliding
   */
  canJumpOnEnemy(enemy) {
      return this.character.isColliding(enemy) &&
          this.character.aboveGround() &&
          this.character.speedY < 0;
  }

  /**
   * conditions of enemy if its dead
   */
  deadEnemy(enemy) {
      let deadChicken = new DeadChicken(enemy.x, enemy.y);
      this.deadEnemies.push(deadChicken);
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
      this.playSound(this.soundDeadChicken, 0.1);
      setTimeout(() => this.deadEnemies.splice(deadChicken), 1000);
  }

  /**
   * conditions of smallEnemy if its dead
   * @param {object} enemy 
   */
  deadSmallEnemy(enemy) {
      let deadBabyChicken = new DeadBabyChicken(enemy.x, enemy.y);
      this.deadEnemies.push(deadBabyChicken);
      this.level.smallEnemies.splice(this.level.smallEnemies.indexOf(enemy), 1);
      this.playSound(this.soundDeadBabyChicken, 0.1);
      setTimeout(() => this.deadEnemies.splice(deadBabyChicken), 1000);
  }

  /**
   *  fighting with the endboss
   */
  fightEndboss() {
      if (this.endboss.isDead()) {
          this.pauseSound(this.soundEndboss);
      } else if (this.canFightEndboss()) {
          this.playSound(this.soundEndboss, 0.1);
          this.music.pause();
          this.checkStartWalkingEndboss();
      } else {
          this.pauseSound(this.soundEndboss);
          this.playMusic();
      }
  }

  /**
   * endboss is attacking 
   */
  canFightEndboss() {
      return this.character.reachedEndboss(this.endboss, 520) &&
          !this.character.isDead();
  }

  /**
   * endboss is walking 
   */
  checkStartWalkingEndboss() {
      if (this.character.reachedEndboss(this.endboss, 480))
          this.endboss.startWalking = true;
  }

  /**
   *  all functions of collision with items
   */
  checkCollisionItems() {
      this.checkCollisionCoins();
      this.checkCollisonBottles();
      this.checkCollisionHeart();
      this.checkCollisionThrownBottle();
  }

  /**
   *  collectiing coins
   */

  checkCollisionCoins() {
      this.level.coins.forEach((coin) => {
          if (this.character.isColliding(coin)) {
              this.coinCollected(coin);
              this.character.raiseProgressbarCoin();
              this.statusBarCoin.setPercentage(this.character.progessCoinBar);
              this.playSound(this.soundCollectCoin, 1);
          }
      });
  }

  /**
   * collecting bottles
   */
  checkCollisonBottles() {
      this.level.bottles.forEach((bottle) => {
          if (this.character.isColliding(bottle)) {
              this.bottleCollected(bottle);
              this.character.raiseProgressbarBottle();
              this.statusBarBottle.setPercentage(this.character.progressBottleBar);
              this.playSound(this.soundCollectBottle, 0.2);
          }
      });
  }

  /**
   * colliding with the heart
   */
  checkCollisionHeart() {
      this.level.hearts.forEach((heart) => {
          if (this.character.isColliding(heart)) {
              let i = this.level.hearts.indexOf(heart);
              this.level.hearts.splice(i, 1);
              this.character.heal(40);
              this.statusBarHealth.setPercentage(this.character.energy);
              this.playSound(this.soundCollectHeart, 0.2);
          }
      });
  }

  /**
  * coin collected 
  */
  coinCollected(coin) {
      let i = this.level.coins.indexOf(coin);
      this.level.coins.splice(i, 1);
  }

  /**
  * bottle collected 
  */
  bottleCollected(bottle) {
      let i = this.level.bottles.indexOf(bottle);
      this.level.bottles.splice(i, 1);
      this.collectedBottles++;
      if (this.collectedBottles >5) {
          this.collectedBottles =5
      }
  }

  /**
   *  all functions of collision with the bottle
   */
  checkCollisionThrownBottle() {
      this.bottleCollisionSmallEnemy();
      this.bottleCollisionEnemy();
      this.bottleCollisionEndboss();
  }

  /**
   *  hitting the smallEnemies with the bottle
   */
  bottleCollisionSmallEnemy() {
      this.throwableObject.forEach((bottle) => {
          this.level.smallEnemies.forEach((enemy) => {
              if (bottle.isColliding(enemy)) {
                  this.splashedBottle(bottle);
                  this.deadSmallEnemy(enemy);
              }
          })
      });
  }

  /**
   *  hitting the enemies with the bottle
   */
  bottleCollisionEnemy() {
      this.throwableObject.forEach((bottle) => {
          this.level.enemies.forEach((enemy) => {
              if (bottle.isColliding(enemy)) {
                  this.splashedBottle(bottle);
                  this.deadEnemy(enemy);
              }
          })
      });
  }

  /**
   *  hitting the endboss with the bottle
   */
  bottleCollisionEndboss() {
      this.throwableObject.forEach((bottle) => {
          if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
              this.splashedBottle(bottle);
              this.endboss.hit(35);
              this.statusBarEndboss.setPercentage(this.endboss.energy);
          }
      });
  }
}