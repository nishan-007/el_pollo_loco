class MovableObject extends DrawableObject {
  speed = 2.5;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.5;

  constructor() {
    super();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 35);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 125;
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }

  move(val) {
    this.x += val;
  }

  jump() {
    return (this.speedY = 12.5);
  }

  playAnimationNSound(movingObjImgs, movingObjSound) {
    this.animate(movingObjImgs);
    movingObjSound.play();
  }

  animate(images) {
    let i = this.current_image % images.length;
    let path = images[i];
    this.image = this.imageCache[path];
    this.current_image++;
  }

  isHurt(hurt_imgs, hurt_sound) {
    this.playAnimationNSound(hurt_imgs, hurt_sound);
  }

  isDead(dead_imgs, dead_sound) {
    this.playAnimationNSound(dead_imgs, dead_sound);
  }
}
