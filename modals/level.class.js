class Level {
  enemies;
  clouds;
  backgrounds;
  bottles;
  screenEnd;
  constructor(enemies, bottles, coins, clouds, backgrounds) {
    this.enemies = enemies;
    this.bottles = bottles;
    this.coins = coins;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
  }
}
