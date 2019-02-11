const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let game;

reset()

let constant;
let gap = 85;

let player = new Image();
let background = new Image();
let ground = new Image();
let blocksN = new Image();
let blocksS = new Image();

player.src = game.images.player;
background.src = game.images.background;
ground.src = game.images.ground;
blocksN.src = game.images.blockN
blocksS.src = game.images.blockS

let clickSound = new Audio();
clickSound.src = game.sounds.click
let scoreSound = new Audio();
scoreSound.src = game.sounds.score
let gameOver = new Audio();
gameOver.src = game.sounds.gameover

function draw(){
  if(game.player.y + player.height >= game.screen.height - ground.height){
    gameOver.play();
    reset()
  }

  for (let i = 0; i < game.blocks.length; i++) {
    let block = game.blocks[i]

    constant = blocksN.height + gap
    ctx.drawImage(blocksN, block.x, block.y);
    ctx.drawImage(blocksS, block.x, block.y + constant);

    if(game.start == "started"){
      block.x--;
    }

    // if( game.player.x + player.width >= block.x && game.player.x <= block.x + blocksN.width && (game.player.x <= block.y + blocksN.height || game.player.x + player.height >= block.y + constant) || game.player.x + player.height >=  canvas.height - ground.height){
    //   gameOver.play();
    //   reset()
    // }

    if(block.x == 100){
      game.blocks.push({
        x: game.screen.width,
        y: Math.floor(Math.random() * blocksN.height) - blocksN.height
      })

    }

    if(block.x == -5){
      game.score++
      scoreSound.play()
    }


  }

  ctx.drawImage(ground, 0, game.screen.height - ground.height, game.screen.width, 118)
  ctx.drawImage(player, game.player.x, game.player.y)

  if(game.start == "started"){
    game.player.y += game.gravity
  }
}


function render(){
  ctx.drawImage(background, 0,0)

  draw()

  requestAnimationFrame(render)

}

function reset(){
  game = {
    start: "pause", // "started" "pause" "gameover"
    blocks: [],
    screen: {
      width: 380,
      height: innerHeight,
    },
    gravity: 1.5,
    score:0,
    images: {
      player: 'images/head.png',
      background: 'images/background.png',
      ground: 'images/ground.png',
      blockN: 'images/blockN.png',
      blockS: 'images/blockS.png',
    },
    sounds: {
      click: 'sounds/fly.mp3',
      score: 'sounds/score.mp3',
      gameover: 'sounds/yandin.m4a'
    },
    player: {
      x: 10,
      y: 150
    }
  };

  canvas.width = game.screen.width;
  canvas.height = game.screen.height;


  game.blocks[0] = {
    x: canvas.width,
    y:0
  }

}


render()

function captureKey(e){
  let key = e.code

  if(key == "KeyW" | key =="ArrowUp" | key == 'Space'){
    game.player.y -= 30;
    clickSound.play();
    game.start = "started"
  }

  if(key == 'KeyP'){
    if(game.start == "pause"){
      game.start = "started"
    }else {
      game.start = "pause"
    }
  }
}
function captureTouch(e){
  let key = e.type

  if(key == "touchstart" ){
    game.player.y -= 30;
    clickSound.play();
    game.start = "started"
  }

}


/*
* Events
*/
window.addEventListener('keydown', captureKey)
window.addEventListener('touchstart', captureTouch)

/*
* Console logger
*/
function log(x){
  console.log(x)
}
