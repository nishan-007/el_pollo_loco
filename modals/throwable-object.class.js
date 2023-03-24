class ThrowableObject extends MovableObject {
  height = 65;
  width = 50;
  bottle_images = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  x;
  y;

  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.throw(x, y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 16;
    this.applyGravity();
    setInterval(() => (this.x += 7.5), 25);
    console.log(this.x);
  }
}
