class Brick {
  constructor(x, y, breedte, hoogte) {
    this.x = x;
    this.y = y;
    this.breedte = breedte;
    this.hoogte = hoogte;
    this.kapot = false;
    this.r = Math.floor(Math.random() * 360);
    this.g = 100;
    this.b = 100;
  }
}