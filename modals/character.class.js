class Character extends MovableObject {
  height = 300;
  y = 125;
  x = 100;
  health = 100;
  screenEnd = 719;

  standing_character = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  sleeping_character = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  walking_character = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  jumping_character = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  hurt_character = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  dead_character = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  world;
  background_sound = new Audio(/*"./audio/background-sound3.mp3"*/);
  walking_sound = new Audio("./audio/walking.mp3");
  jumping_sound = new Audio("./audio/jump2.mp3");
  hurt_sound = new Audio("./audio/hurt.mp3");
  dead_sound = new Audio("./audio/dead.mp3");

  constructor() {
    super();
    this.loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.walking_character);
    this.loadImages(this.jumping_character);
    this.loadImages(this.standing_character);
    this.loadImages(this.sleeping_character);
    this.loadImages(this.hurt_character);
    this.loadImages(this.dead_character);
    this.walkNJumpFunc();
    this.applyGravity();
  }

  walkNJumpFunc() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.checkXPoleRight() && this.world.keyboard.RIGHT) {
        this.walk(false, 25);
      } else if (this.checkXPoleLeft() && this.world.keyboard.LEFT) {
        this.walk(true, -25);
      } else {
        this.playAnimationNSound(
          this.standing_character,
          this.background_sound
        );
      }
      if (this.world.keyboard.SPACE) {
        this.playAnimationNSound(this.jumping_character, this.jumping_sound);
        if (!this.isAboveGround()) {
          this.jump();
        }
      }
      this.world.camera_x = -this.x + 100;
    }, 100);
  }

  walk(booleanVal, moveVal) {
    this.otherDirection = booleanVal;
    this.move(moveVal);
    this.playAnimationNSound(this.walking_character, this.walking_sound);
  }

  isCharacterHurt() {
    this.health -= 2.5;
    if (this.health > 0) {
      this.isHurt(this.hurt_character, this.hurt_sound);
    } else {
      this.isDead(this.dead_character, this.dead_sound);
    }
  }

  checkXPoleRight() {
    return this.x <= this.screenEnd * 2;
  }

  checkXPoleLeft() {
    return this.x > 100;
  }
}
