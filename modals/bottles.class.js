class Bottle extends MovableObject {
  height = 65;
  width = 50;
  y = 75;
  bottle_images = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super();
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.bottle_images);
    this.x = 300 + Math.floor(Math.random() * 1250);
    this.y -= Math.floor(Math.random() * 25);
    this.playAnimation();
  }

  playAnimation() {
    setInterval(() => {
      this.animate(this.bottle_images);
    }, 350);
  }
}
