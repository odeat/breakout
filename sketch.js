let oldTime = 0;
let balls = [];
let bricks = [];
let score = 0;

let paddleX;
let paddleY;
let paddleWidth = 200; 
let paddleHeight = 40;
let paddleSnelheid = 10;
let paddleHue = 0;
let ballChance = 0.2;
let keys = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddleX = (width - paddleWidth) / 2;
  paddleY = height - 100;
  balls.push(new Ball(windowWidth / 2, windowHeight - 150, -100, -800));
  colorMode(HSB, 360, 100, 100);

  let cols = 10;
  let rows = 5;
  let brickW = 80;
  let brickH = 80;
  let hSpacing = 20; // horizontal space between bricks
  let vSpacing = 20; // vertical space between bricks

  let totalWidth = cols * brickW + (cols - 1) * hSpacing;
  let startX = (width - totalWidth) / 2;
  let startY = 100;

  bricks = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let bx = startX + x * (brickW + hSpacing);
      let by = startY + y * (brickH + vSpacing);
      bricks.push(new Brick(bx, by, brickW, brickH));
    }
  }
}

function draw() {
  let deltaTime = millis() - oldTime;
  let dt = deltaTime / 1000;
  oldTime = millis();
  paddleHue += dt * 180;
  paddleHue = paddleHue % 360;

  if (keys[37]) paddleX -= paddleSnelheid;
  if (keys[39]) paddleX += paddleSnelheid;

  // Keep paddle within screen
  paddleX = constrain(paddleX, 0, width - paddleWidth);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.x += ball.velX * dt;
    ball.y += ball.velY * dt;
    if (ball.x <= 0) {
      ball.velX = Math.abs(ball.velX);
    }
    if (ball.x > width) {
      ball.velX = -Math.abs(ball.velX);
    }
    if (ball.y > height) {
      ball.velY = -Math.abs(ball.velY);
      balls.splice(i, 1);
      i--;
    }
    if (ball.y <= 0) {
      ball.velY = Math.abs(ball.velY);
    }
    if (checkCollision(ball.x, ball.y, paddleX, paddleY, paddleWidth, paddleHeight)) {
      let paddleHitRatio = map(ball.x, paddleX, paddleX + paddleWidth, -1, 1);
      ball.velX = 400 * paddleHitRatio;
      ball.velY = -Math.abs(ball.velY);
    }
    for (let brick of bricks) {
      if (brick.kapot) continue;
      let result = checkCollision2(ball.x, ball.y, brick.x, brick.y, brick.breedte, brick.hoogte);
      if (result !== "NONE") {
        if (result === "LEFT" || result === "RIGHT") {
          ball.velX *= -1;
        } else if (result === "TOP" || result === "BOTTOM") {
          ball.velY *= -1;
        }
        brick.kapot = true;
        score += 10;
        let allDestroyed = bricks.every(b => b.kapot);
        if (allDestroyed) {
          for (let brick2 of bricks) {
            brick2.kapot = false;
          }
        }
        if (random() < ballChance) {
          balls.push(new Ball(ball.x, ball.y, -ball.velX, -ball.velY));
        }
      }
    }
  }

  background(0, 0, 0);
  for (let brick of bricks) {
    if (!brick.kapot) {
      fill(brick.r, brick.g, brick.b);
      rect(brick.x, brick.y, brick.breedte, brick.hoogte);
    }
  }
  for (let ball of balls) {
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, 50);
  }
  fill(255, 100, 100);
  textSize(48);
  text("SCORE: " + score, 20, 50);
  fill(paddleHue, 100, 100);
  rect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function checkCollision(x, y, xBox, yBox, boxWidth, boxHeight) {
  return x > xBox && y > yBox && y < yBox + boxHeight && x < xBox + boxWidth;
}

function checkCollision2(x, y, xBox, yBox, boxWidth, boxHeight) {
  if (x > xBox && y > yBox && y < yBox + boxHeight && x < xBox + boxWidth) {
    let leftDist = Math.abs(x - xBox);
    let rightDist = Math.abs(x - (xBox + boxWidth));
    let topDist = Math.abs(y - yBox);
    let bottomDist = Math.abs(y - (yBox + boxHeight));
    let minDist = Math.min(leftDist, rightDist, topDist, bottomDist);
    if (minDist === leftDist) return "LEFT";
    if (minDist === rightDist) return "RIGHT";
    if (minDist === topDist) return "TOP";
    if (minDist === bottomDist) return "BOTTOM";
  }
  return "NONE";
}

function keyPressed() {
  keys[keyCode] = true;
  if (keyCode === 32 && balls.length === 0) {
    balls.push(new Ball(paddleX + paddleWidth / 2, paddleY, random(-200, 200), -500));
  }
}

function keyReleased() {
  keys[keyCode] = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  paddleX = (width - paddleWidth) / 2;
  paddleY = height - 100;

}