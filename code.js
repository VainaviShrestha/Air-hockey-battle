var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating objects

//creating goals
var goal1=createSprite(200,10,150,10);
goal1.shapeColor="yellow";

var goal2=createSprite(200,380,150,10);
goal2.shapeColor="yellow";

//Making Court 
var boundary1 = createSprite(200, 0,400,10);
boundary1.shapeColor="white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";


//creating striker and the mallets
var striker = createSprite(200,200,20,20);
striker.shapeColor="white";

var playerMallet = createSprite(200,50,80,10);
playerMallet.shapeColor="black";
var computerMallet = createSprite(200,350,80,10);
computerMallet.shapeColor="black";

//Variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0;


function draw() {
  
  background("green");
  
    drawSprites();

// hitting space to move the striker
  if (gameState === "serve") {
    textSize(18);
    fill("maroon");
    text("Press Space to Strike",120,180);
    computerMallet.x = 200;
    computerMallet.y = 350;
  }
  
  
  text(compScore, 10,225);
  text(playerScore,10,185);
  
// make the player mallet move with the arrow keys
    if(keyDown("left")){
    playerMallet.x = playerMallet.x+10;
    
  }
  if(keyDown("right")){
     playerMallet.x = playerMallet.x-10;
    
  }
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y+5;
   }
  }
  if(keyDown("down")){
    
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y-5;
   }
  }
  
// ai for the compMallet
// making it move with the striker's y position

  computerMallet.x = striker.x;
  
  // creating center line
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  
  createEdgeSprites();
  striker.bounceOff(edges);
  
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  

  if (keyDown("space") &&  gameState === "serve") {
    serve();
    striker.velocityX = striker.velocityX -1;
    striker.velocityY = striker.velocityY -1;
    gameState = "play";   
    
  }
  // Score  
  
  if(striker.isTouching(goal1) || striker.isTouching(goal2) )
  {
    if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
      }
      
      reset();
      gameState = "serve";
  }
  
  
  if (playerScore === 5 || compScore === 5){
    gameState = "end";
    
    textSize(18);
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
    playerMallet.x = 200;
    playerMallet.y = 40;
  }
  
  
  if (keyDown("r") && gameState === "end") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}
function serve() {
  striker.velocityX = 6;
  striker.velocityY = 6;
 
}

function reset() {
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}
 





// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
