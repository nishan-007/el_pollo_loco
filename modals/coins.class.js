class Coin extends MovableObject {
  height = 80;
  width = 80;
  y = 250;
  coins_images = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super();
    this.loadImage("img/8_coin/coin_1.png")
    this.loadImages(this.coins_images);
    this.x = 300 + Math.floor(Math.random() * 1000);
    this.y -= Math.floor(Math.random() * 125);
    this.animate();
  }
  animate() {
    setInterval(() => {
      let i = this.current_image % this.coins_images.length;
      let path = this.coins_images[i];
      this.image = this.imageCache[path];
      this.current_image++;
    }, 350);
  }
}
