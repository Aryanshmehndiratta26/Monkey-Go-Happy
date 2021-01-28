var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Monkey_01, Monkey_02, Monkey_03,Monkey_04,Monkey_05,Monkey_06,Monkey_07,Monkey_08,Monkey_09,Monkey_10;
var jungle, invisibleGround;

var bananaGroup, banana;
var stoneGroup,stone;

var score=0;


localStorage["HighestScore"] = 0;

function preload(){
  monkey_running =   loadAnimation("Monkey_01", "Monkey_02", "Monkey_03","Monkey_04","Monkey_05","Monkey_06","Monkey_07","Monkey_08","Monkey_09","Monkey_10");
  monkey_collided = loadAnimation("Monkey_01.png");
  
  jungleImage = loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  
  stone = loadImage("stone.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", Monkey_01);
  monkey.scale = 0.5;
  
  jungle = createSprite(200,180,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.x = jungle.width /2;
  jungle.velocityX = -(6 + 3*score/100);
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}

function draw() {
  //monkey.debug = true;
  background(255);
  monkey("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    jungle.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
    monkey.collide(invisibleGround);
    spawnBanana();
    spawnStone();
  
    if(stoneGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //change the trex animation
    monkey.changeAnimation("collided",monkey_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  
  
  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnStone() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(600,165,10,40);
    //stone.debug = true;
    stone.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: stone.addImage(stone);
              
    }
    
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.5;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
  }
}


  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}