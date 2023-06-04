class Character extends MoveableObject {

  world;
  speed = 10;

  animationInterval;
  characterLastMovement = 0;
  soundJump = new Audio('audio/jump.mp3');
  soundHurt = new Audio('audio/hurt.mp3');
  soundDead = new Audio('audio/dead.mp3');
  soundWalk = new Audio('audio/walking.mp3');
  soundSnoring = new Audio('audio/snoring.mp3');

  offset = {
      top: 100,
      bottom: 15,
      left: 20,
      right: 20
  }


  imagesCharacterWalking = [
      'img/2_character_pepe/2_walk/W-22.png',
      'img/2_character_pepe/2_walk/W-23.png',
      'img/2_character_pepe/2_walk/W-24.png',
      'img/2_character_pepe/2_walk/W-25.png',
      'img/2_character_pepe/2_walk/W-26.png'
  ];


  imagesCharacterJumping = [
      'img/2_character_pepe/3_jump/J-31.png',
      'img/2_character_pepe/3_jump/J-32.png',
      'img/2_character_pepe/3_jump/J-33.png',
      'img/2_character_pepe/3_jump/J-34.png',
      'img/2_character_pepe/3_jump/J-35.png',
      'img/2_character_pepe/3_jump/J-36.png',
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png'
  ];


  imagesHurt = [
      'img/2_character_pepe/4_hurt/H-41.png',
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png'
  ];


  imagesDead = [
      'img/2_character_pepe/5_dead/D-51.png',
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png'
  ];


  imagesIdle = [
      'img/2_character_pepe/1_idle/idle/I-1.png',
      'img/2_character_pepe/1_idle/idle/I-2.png',
      'img/2_character_pepe/1_idle/idle/I-3.png',
      'img/2_character_pepe/1_idle/idle/I-4.png',
      'img/2_character_pepe/1_idle/idle/I-5.png',
      'img/2_character_pepe/1_idle/idle/I-6.png',
      'img/2_character_pepe/1_idle/idle/I-7.png',
      'img/2_character_pepe/1_idle/idle/I-8.png',
      'img/2_character_pepe/1_idle/idle/I-9.png',
      'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  imagesSleeping = [
      'img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];


  constructor() {
      super().loadImage(this.imagesCharacterWalking[0]);
      this.loadImages(this.imagesCharacterWalking);
      this.loadImages(this.imagesCharacterJumping);
      this.loadImages(this.imagesHurt);
      this.loadImages(this.imagesDead);
      this.loadImages(this.imagesIdle);
      this.loadImages(this.imagesSleeping);
      this.applyGravity();
      this.animateMovement();
      this.setAnimation();
      this.setTimeStamp();
  }


  /**
   *  walking and jumping
   */
  animateMovement() {
      this.walking();
      this.jumping();
  }


  /**
   *  moving right and left 
   */
  walking() {
      setInterval(() => {
          this.soundWalk.pause();
          this.walkingDirectionRight();
          this.walkingDirectionLeft();
          this.world.cameraX = -this.x + 100;
      }, 1000 / 30);
  }


  
  walkingDirectionRight() {
      if (this.canMoveRight()) {
          this.moveRight();
          this.changeDirection = false;
          this.world.playSound(this.soundWalk, 1);
      }
  }


  
  canMoveRight() {
      return this.world.keyboard.RIGHT &&
          this.x < 5750 &&
          !this.world.endboss.endGame;
  }


  
  walkingDirectionLeft() {
      if (this.canMoveLeft()) {
          this.moveLeft();
          this.changeDirection = true;
          this.world.playSound(this.soundWalk, 1);
      }
  }


  
  canMoveLeft() {
      return this.world.keyboard.LEFT &&
          this.x > 100 &&
          !this.world.endboss.endGame;
  }


  
  jumping() {
      setInterval(() => {
          if (this.canJump())
              this.jump(20);
      }, 1000 / 60);
  }


  
  canJump() {
      return this.world.keyboard.SPACE &&
          !this.aboveGround() &&
          !this.world.endboss.endGame;
  }


  
  setAnimation() {
      this.animationInterval = setInterval(() => this.animation(), 100);
  }


  /**
   * checks all different animations
   */
  animation() {
      this.soundSnoring.pause();
      if (this.isDead())
          this.characterDead();
      else if (this.isHurt() && !this.world.endboss.endGame)
          this.characterHurt();
      else if (this.aboveGround() && !this.world.endboss.endGame) {
          this.characterJump();
          this.setTimeStamp(); }
      else if (this.walkKeypressEvent() && !this.world.endboss.endGame) {
          this.playAnimation(this.imagesCharacterWalking);
          this.setTimeStamp(); }
      else if (this.characterMoveTimepassed() > 2) {
          this.playAnimation(this.imagesSleeping);
          this.world.playSound(this.soundSnoring, 0.2);
      }
      else
          this.playAnimation(this.imagesIdle);
  }
  
  
  characterMoveTimepassed() {
      let timepassed = new Date().getTime() - this.characterLastMovement;
      timepassed = timepassed / 1000;
      return timepassed;
  }

  
  setTimeStamp() {
      this.characterLastMovement = new Date().getTime();
  }


  
  walkKeypressEvent() {
      return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }


  
  characterDead() {
      this.playAnimation(this.imagesDead);
      this.world.playSound(this.soundDead, 1);
      setTimeout(() => {
          clearInterval(this.animationInterval);
          this.endGame = true;
      }, 1000)
  }


  
  characterHurt() {
      this.playAnimation(this.imagesHurt);
      this.world.playSound(this.soundHurt, 0.5);
  }


  
  characterJump() {
      this.playAnimation(this.imagesCharacterJumping);
      if (this.speedY > 0)
          this.world.playSound(this.soundJump, 0.5);
  }
}