var starImg,bgImg, bgOFC;
var star, starBody;
var Fada, imgFada, vozFada;
var Parede;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
    starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
    imgFada = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
    vozFada = loadSound("sound/JoyMusic.mp3");
}

function setup() {
    createCanvas(800, 750);
    
    engine = Engine.create();
	world = engine.world;
    
    bgOFC = createSprite(400,375);
    bgOFC.addImage(bgImg);
    
    Fada = createSprite(400,500);
    Fada.addAnimation("Fadinha",imgFada);
    Fada.scale = 0.09;
    Fada.setCollider("circle", 0, 0, 400);

    star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

    Parede = createSprite(650,500,10,100);
    Parede.visible = false;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
    
	World.add(world, starBody);
}

function draw(){
    
    background(0);
    
    Engine.update(engine);
    
    Fada.collide(Parede);

    star.x = starBody.position.x;
    star.y = starBody.position.y;
    
    if(keyCode === DOWN_ARROW){
        Matter.Body.setStatic(starBody,false);
    }

    if(keyCode === LEFT_ARROW){
       Fada.velocityX = -5;
    }

    if(keyCode === RIGHT_ARROW){
       Fada.velocityX = 5;
    }

    if(star.y > 470 && starBody.position.y > 470){
       Matter.Body.setStatic(starBody,true);
    }
    
    if(Fada.isTouching(star)){
       vozFada.play();
    }
    
    Fada.display();

    drawSprites();
}
