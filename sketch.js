var trex ,trex_running;
var groundImage;
var invisibleGround;
var cloud, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  text("Puntuacion" + score, 500, 50);
  score = score + frameCount / 60;
  
  //crear sprite de Trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;


  //crear sprite del suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);

  //crear sprite del suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  var rango = Math.round(random(1,20));
  console.log(rango);

}

function draw(){
  background("white")
  text("Puntuacion: " + score, 500, 50);
  

  //Estados de juego
  if(gameState === PLAY){
  //mover el suelo
    ground.velocityX = -4;

    //generar puntuacion
    score = score + Math.round (frameCount / 60);

    //reiniciar el suelo
    if(ground.x < 0){
      ground.x = ground.width/2;
    }

 //salto del trex
  if(keyDown("space") && trex.y >= 100){
    trex.velocityY = -10;
  }
  //caida gravedad del trex
  trex.velocityY = trex.velocityY + 0.5;

  //llamado de la funcion de nubes
  spawnClouds();

  //llamado de la funcion de obstaculos
  spawnObstacles();

  }else if(gameState === END){
    //detener el suelo
    ground.velocityX = 0;
  }

  //evitar que el trex caiga
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 == 0){
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //asignar ciclo de vida
    cloud.lifetime = 210;
  }
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6

    //generar obstaculos al azar
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default: break;
    }
    //asignar escala y tiempo de vida
    obstacle.scale = 0.5
    obstacle.lifetime = 210;
  }
}
