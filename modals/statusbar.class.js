class HealthStatusbar extends DrawableObject {
  height = 45;
  width = 140;
  y = 0;
  x = 10;

  health_images = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImage(
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    );
    this.loadImages(this.health_images);
    this.setPercentage(this.percentage, this.health_images);
  }

  checkPercentage() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

class BottleStatusbar extends DrawableObject {
  height = 45;
  width = 140;
  y = 40;
  x = 10;
  bottle_images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  percentage = 0;

  constructor() {
    super();
    this.loadImage(
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png"
    );
    this.loadImages(this.bottle_images);
    this.setBottlePercentage(this.percentage);
  }

  checkPercentage() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setBottlePercentage(currPercent) {
    this.percentage = currPercent;
    let path = this.bottle_images[this.checkPercentage()];
    this.image = this.imageCache[path];
  }
}
class CoinsStatusbar extends DrawableObject {
  height = 45;
  width = 140;
  y = 80;
  x = 10;
  bottle_images = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  percentage = 0;

  constructor() {
    super();
    this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
    this.loadImages(this.bottle_images);
    this.setCoinsPercentage(this.percentage);
  }

  checkPercentage() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setCoinsPercentage(currPercent) {
    this.percentage = currPercent;
    let path = this.bottle_images[this.checkPercentage()];
    this.image = this.imageCache[path];
  }
}

class EndbossStatusbar extends DrawableObject {
  height = 45;
  width = 140;
  y = 120;
  x = 10;
  bottle_images = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  percentage = 0;

  constructor() {
    super();
    this.loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png");
  }
}
