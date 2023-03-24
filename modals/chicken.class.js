class Chicken extends MovableObject {
  height = 65;
  width = 50;
  y = 350;
  image;
  walking_normalChicken = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  dead_normalChicken = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  chicken_sound = new Audio("./audio/chicken.mp3");

  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.walking_normalChicken);
    this.loadImages(this.dead_normalChicken);
    this.x = 300 + Math.random() * 1000;
    this.speed += Math.random();
    // this.move();
  }

  move() {
    setInterval(() => {
      this.moveLeft(15);
      this.animatation(this.walking_normalChicken);
    }, 400);
  }

  isDead() {
    this.playAnimationNSound(this.dead_normalChicken, this.chicken_sound);
  }
}

class LitteChicken extends MovableObject {
  height = 50;
  width = 35;
  y = 365;
  walking_littleChicken = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  dead_littleChicken = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  chicken_sound = new Audio("./audio/small-chicken2.mp3");

  constructor() {
    super();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.walking_littleChicken);
    this.loadImages(this.dead_littleChicken);
    this.x = 400 + Math.random() * 1000;
    // this.move();
  }

  move() {
    setInterval(() => {
      this.moveLeft(12);
      this.animatation(this.walking_littleChicken);
      // this.chicken_sound.play();
    }, 450);
  }

  isDead() {
    this.playAnimationNSound(this.dead_littleChicken, this.chicken_sound);
  }
}
