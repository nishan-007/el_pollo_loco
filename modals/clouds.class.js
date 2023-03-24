class Cloud extends MovableObject {
  y = 75;
  height = 250;
  width = 400;
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 200 + Math.floor(Math.random() * 500);
    this.speed += (Math.random() * 2.5); 
    // this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
