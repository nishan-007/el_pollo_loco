class DrawableObject {
  x = 120;
  y = 175;
  height = 250;
  width = 100;

  img;
  imageCache = {};
  currentImage = 0;

  offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
  };


  
  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

  
  
  loadImages(arr) {
      arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
          });
  }


  
  draw(ctx) {
      try{
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch(e) {
          console.warn('Error loading Image', e);
          console.log('Could not load Image', this.img.src);
      }
  }
}