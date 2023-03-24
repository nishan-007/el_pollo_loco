class DrawableObject {
  x = 50;
  y = 225;
  image;
  height = 150;
  width = 100;
  current_image = 0;
  imageCache = {};

  loadImage(path) {
    this.image = new Image();
    this.image.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "#3E54AC";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  setPercentage(currPercent) {
    this.percentage = currPercent;
    let path = this.health_images[this.checkPercentage()];
    this.image = this.imageCache[path];
  }
}
