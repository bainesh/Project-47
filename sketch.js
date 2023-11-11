var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, rock, bullet, restart;
var playerImg, rockImg, bulletImg, restartImg;
var rocksGroup, bulletGroup;

function preload() {
  playerImg = loadImage("jet.png");
  rockImg = loadImage("meteor.png");
  bulletImg = loadImage("bullet.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(400, 400);
  
  player = createSprite(180, 340, 20, 20);
  player.addImage(playerImg);
  player.scale = 1;
  
  restart = createSprite(0, 0, 40, 40);
  restart.addImage(restartImg);
  restart.scale = 1;
  
  rocksGroup = new Group();
  bulletGroup = new Group();
  
  score = 0;
}

function draw() {
  background("blue");
  
  if (gameState === PLAY) {
    // moving jet
    player.x = mouseX;
    
    // Spawn Rocks
    spawnRocks();
    
    if (mousePressedOver(restart)) {
      reset();
    }
    
    if (mousePressedOver(player)) {
      createBullet();
    }
    
    if (bulletGroup.isTouching(rocksGroup)) {
      rocksGroup.destroyEach();
      bulletGroup.destroyEach();
      score = score + 10;
    }
    
    if (rocksGroup.isTouching(player)) {
      gameState = END;
    }
  }
  else if (gameState === END) {
    fill(0, 0, 0);
    textSize(25);
    text("YOU LOST!", width / 2, height / 2);
  }
  
  drawSprites();
  
  fill(0, 0, 0);
  text("Score: " + score, 300, 50);
}

function spawnRocks() {
  rock = createSprite(Math.round(random(20, 370)), 0, 10, 10);
  rock.addImage(rockImg);
  rock.velocityY = 3;
  rock.scale = 1;
  rocksGroup.add(rock);
}

function createBullet() {
  bullet = createSprite(mouseX, 340, 10, 30);
  bullet.addImage(bulletImg);
  bullet.velocityY = -4;
  bullet.scale = 1;
}

function reset() {
  gameState = PLAY;
  rocksGroup.destroyEach();
  score = 0;
}