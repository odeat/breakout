class Ball {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.r = Math.floor(Math.random() * 360);
    this.g = 100;
    this.b = 100;
  }
}
