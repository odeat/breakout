class Brick{
  float x;
  float y;
  float breedte;
  float hoogte;
  boolean kapot = false;
  int r;
  int g;
  int b;
  
  Brick(float x, float y, float breedte, float hoogte){
    this.x = x;
    this.y = y;
    this.breedte = breedte;
    this.hoogte = hoogte;
    this.r = (int)random(360);
    this.g = 100;
    this.b = 100;
  }
};
