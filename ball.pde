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
    this.r = (int)random(255);
    this.g = (int)random(255);
    this.b = (int)random(255);
  }
};
