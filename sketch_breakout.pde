int oldTime = 0;
ArrayList<Ball> balls = new ArrayList<Ball>();
ArrayList<Brick> bricks = new ArrayList<Brick>();

int paddleX = 500;
int paddleY = 800;
int paddleWidth = 200;
int paddleHeight = 40;

void setup() {
  size(1200, 900);
  balls.add(new Ball(600, 750, -100, -800));
  //bricks.add(new Brick(100, 100, 250, 80));
  //bricks.add(new Brick(450, 300, 250, 80));
  //bricks.add(new Brick(800, 100, 250, 80));

  for (int x=0; x <= 10; x++) {
    for (int y=0; y <= 5; y++) {
      bricks.add(new Brick(100 + x * 100, 100 + y * 100, 90, 80));
    }
  }
}

void draw() {
  int deltaTime = millis() - oldTime;
  float dt = deltaTime / 1000f;
  oldTime = millis();
  // updating
  if (keys[37] == true) {
    paddleX -= 5;
  }
  if (keys[39] == true) {
    paddleX += 5;
  }
  for (Ball ball : balls) {
    ball.x += ball.velX * dt;
    ball.y += ball.velY * dt;
    if (ball.x <= 0) {
      ball.velX = abs(ball.velX);
    }
    if (ball.x > width) {
      ball.velX = abs(ball.velX) * -1;
    }
    if (ball.y > height) {
      ball.velY = abs(ball.velY) * -1;
      println("MISS!");
    }
    if (ball.y <= 0) {
      ball.velY = abs(ball.velY);
    }
    if (checkCollision(ball.x, ball.y, paddleX, paddleY, paddleWidth, paddleHeight)) {
      print("HIT! \n");
      float paddleHitRatio = map(ball.x, paddleX, paddleX + paddleWidth, -1, 1);
      ball.velX = 400 * paddleHitRatio;
      ball.velY = abs(ball.velY) * -1;
    }
    for (Brick brick : bricks) {
      if (brick.kapot == true) {
        continue;
      }
      String result = checkCollision2(ball.x, ball.y, brick.x, brick.y, brick.breedte, brick.hoogte);
      if (result != "NONE") {
        println("BRICK HIT!");
        if (result == "LEFT" || result == "RIGHT") {
          ball.velX *= -1;
        } else if (result == "TOP" || result == "BOTTOM") {
          ball.velY *= -1;
        }
        brick.kapot = true;
      }
    }
  }
  // rendering
  background(0, 0, 0);
  int i = 0;
  while (i < bricks.size()) {
    Brick brick = bricks.get(i);
    if (brick.kapot == false) {
      rect(brick.x, brick.y, brick.breedte, brick.hoogte);
    }
    i++;
  }
  for (Ball ball : balls) {
    circle(ball.x, ball.y, 50);
  }
  rect(paddleX, paddleY, paddleWidth, paddleHeight);
  // println(mouseX, mouseY);
}

boolean checkCollision(double x, double y, double xBox, double yBox, double boxWidth, double boxHeight) {


  if (x > xBox && y > yBox && y < yBox + boxHeight && x < xBox + boxWidth) {
    return true;
  } else {
    return false;
  }
}
String checkCollision2(double x, double y, double xBox, double yBox, double boxWidth, double boxHeight) {
  // Controleer of het balletje binnen de rechthoek is
  if (x > xBox && y > yBox && y < yBox + boxHeight && x < xBox + boxWidth) {
    // Bereken de afstand tot elke zijde van de rechthoek
    double leftDist = Math.abs(x - xBox);
    double rightDist = Math.abs(x - (xBox + boxWidth));
    double topDist = Math.abs(y - yBox);
    double bottomDist = Math.abs(y - (yBox + boxHeight));

    // Vind de dichtstbijzijnde kant
    double minDist = Math.min(Math.min(leftDist, rightDist), Math.min(topDist, bottomDist));

    // Controleer welke zijde wordt geraakt en retourneer de kant
    if (minDist == leftDist) {
      return "LEFT";
    } else if (minDist == rightDist) {
      return "RIGHT";
    } else if (minDist == topDist) {
      return "TOP";
    } else if (minDist == bottomDist) {
      return "BOTTOM";
    }
  }
  return "NONE";
}

boolean[] keys = new boolean[1000];
void keyPressed() {
  keys[keyCode] = true;
  // println(keyCode);
}

void keyReleased() {
  keys[keyCode] = false;
}
