const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let game = {
  start: "pause", // "started" "pause" "gameover"
  blocks: [],
  screen: {
    width: 380,
    height: innerHeight,
  },
  gravity: 1.5,
  score:0,
  images: {
    player: 'images/bird.png',
    background: 'images/background.png',
    ground: 'images/ground.png'
  },
  sounds: {
    click: 'sounds/fly.mp3',
    score: 'sounds/score.mp3'
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

let player = new Image();
let background = new Image();
let ground = new Image();

player.src = game.images.player;
background.src = game.images.background;
ground.src = game.images.ground;

let clickSound = new Audio();
clickSound.src = game.sounds.click
let scoreSound = new Audio();
scoreSound.src = game.sounds.score


function render(){
  ctx.drawImage(background, 0,0)

  if(game.player.y + player.height >= game.screen.height - ground.height){
    scoreSound.play()
    location.reload()
  }


  ctx.drawImage(ground, 0, game.screen.height - ground.height, game.screen.width, 118)
  ctx.drawImage(player, game.player.x, game.player.y)

  if(game.start == "started"){
    game.player.y += game.gravity
  }

  requestAnimationFrame(render)

}


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

render()

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
