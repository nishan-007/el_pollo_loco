class MoveableObject extends DrawableObject {

  speed = 0.15;
  speedY = 0;
  acceleration = 1;
  changeDirection = false;
  energy = 100;
  lastHit = 0;
  attack = false;
  endGame = false;
  progessCoinBar = 0;
  progressBottleBar = 0;


  /**
   * load the animations of the images
   */
  playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
  }

  moveRight() {
      this.x += this.speed;
  }


  moveLeft() {
      this.x -= this.speed;
  }


  /**
   * apply gravitiy 
   */
  applyGravity() {
      setInterval(() => {
          if(this.aboveGround() || this.speedY > 0) {
              this.y -= this.speedY;
              this.speedY -= this.acceleration;
          }
      }, 1000 / 60);
  }


  /**
   * returns object back to the ground or let them fall out of game
   */
  aboveGround() {
      if (this instanceof ThrowableObjects || this.isDead())
          return true;
          else 
          return this.y < 175;
      }


  /**
   * jumping 
   */ 
  jump(speed) {
      this.speedY = speed;
      }


  /**
   * checks if two objects are colliding together
   */
  isColliding(mo) {
      return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
          this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  

  rightBorder() {
      return this.x + this.width - this.offset.right;
  }


  leftBorder() {
      return this.x + this.offset.left;
  }


  topBorder() {
      return this.y + this.offset.top;
  }


  bottomBorder() {
      return this.y + this.height - this.offset.bottom;
  }


  rightObjectBorder(object) {
      return object.x + object.width - object.offset.right;
  }


  leftObjectBorder(object) {
      return object.x + object.offset.left;
  }


  topObjectBorder(object) {
      return object.y + object.offset.top;
  }


  bottomObjectBorder(object) {
      return object.y + object.height - object.offset.bottom;
  }


  raiseProgressbarCoin() {
      this.progessCoinBar += 20;
      if (this.progessCoinBar > 100) {
          this.progessCoinBar = 100;
      }
  }


  raiseProgressbarBottle() {
      this.progressBottleBar += 20;
      if (this.progressBottleBar > 100) {
          this.progressBottleBar = 100;
      }
  }


  reduceProgressbarBottle() {
      this.progressBottleBar -= 20;
  }


  /**
   * subtracts the damage from enemy  
   */
  hit(damage) {
      this.energy -= damage;
      if (this.energy < 0) {
          this.energy = 0;
      } else {
          this.lastHit = new Date().getTime();
      }
  }


  /**
   * collected heart heals you if you are under 100% life
   */
  heal(life) {
      this.energy += life;
          if (this.energy > 100)
              this.energy = 100;
      }


  /**
   * time limit from the last time you got hurt
   */
  isHurt() {
      let timeSinceLastHit = new Date().getTime() - this.lastHit; 
      return timeSinceLastHit < 500;
  }


  /**
   * object is dead if the lifebar goes to 0
   */
  isDead() {
  return this.energy == 0;
  }
      

  reachedEndboss(object, distance) {
      return this.rightBorder() + distance > this.leftObjectBorder(object);
  }
}