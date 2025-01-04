class Ball{
  float x;
  float y;
  float velX;
  float velY;
  int r;
  int g;
  int b;
  
  Ball(float x, float y, float velX, float velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.r = (int)random(360);
    this.g = 100;
    this.b = 100;
  }
};
