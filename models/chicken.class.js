class Chicken extends MoveableObject {
  y = 335;
  width = 65;   
  height = 85;

  offset = {
      top: 20,
      bottom: 30,
      left: 20,
      right: 20
  }


  imagesChickenWalking = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];


  constructor(x) {
      super().loadImage(this.imagesChickenWalking[0]);
      this.loadImages(this.imagesChickenWalking);
      this.x = x + Math.random() * 4800; 
      this.speed = 0.15 + Math.random() * 0.5;
  
      this.walking();
  }

  
  
  walking() {
      setInterval(() => this.moveLeft(), 1000 / 60);
      setInterval(() => this.playAnimation(this.imagesChickenWalking), 100);
  }
}