class Endboss extends MovableObject {
  x = 1650;
  y = 50;
  width = 375;
  height = 400;

  images_walking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  images_alert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  images_attack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  images_hurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  health = 50;

  endboss_sound = new Audio("./audio/chicken.mp3");

  constructor() {
    super();
    this.loadImage("img/4_enemie_boss_chicken/1_walk/G2.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_alert);
    this.loadImages(this.images_attack);
    this.loadImages(this.images_hurt);
  }

  move() {
    setInterval(() => {
      this.animate(this.images_walking);
    }, 250);
    this.endboss_sound.play();
  }

  animate(images) {
    let i = this.current_image % images.length;
    let path = images[i];
    this.image = this.imageCache[path];
    this.current_image++;
  }
}
