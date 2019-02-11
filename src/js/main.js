const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let game;

reset();

let constant;
let gap = 120;

let player = new Image();
let background = new Image();
let ground = new Image();
let blocksN = new Image();
let blocksS = new Image();

player.src = game.images.player;
background.src = game.images.background;
ground.src = game.images.ground;
blocksN.src = game.images.blockN;
blocksS.src = game.images.blockS;

let clickSound = new Audio();
clickSound.src = game.sounds.click;
let scoreSound = new Audio();
scoreSound.src = game.sounds.score;
let gameOver = new Audio();
gameOver.src = game.sounds.gameover;

function draw() {
  if (game.player.y + player.height >= game.screen.height - ground.height) {
    gameOver.play();
    reset();
  }

  for (let i = 0; i < game.blocks.length; i++) {
    let block = game.blocks[i];

    constant = blocksN.height + gap;
    ctx.drawImage(blocksN, block.x, block.y);
    ctx.drawImage(blocksS, block.x, block.y + constant);

    if (game.start == "started") {
      block.x--;
    }

    if (
      (game.player.x + player.width >= block.x &&
        game.player.x <= block.x + blocksN.width &&
        (game.player.y <= block.y + blocksN.height ||
          game.player.y + player.height >= block.y + constant)) ||
      game.player.y + player.height >= canvas.height - ground.height
    ) {
      gameOver.play();
      reset();
      resizeWindow();
    }

    if (block.x == 150) {
      game.blocks.push({
        x: game.screen.width,
        y: Math.floor(Math.random() * blocksN.height) - blocksN.height
      });
    }

    if (block.x == -5) {
      game.score++;
      scoreSound.play();
    }
  }

  ctx.drawImage(
    ground,
    0,
    game.screen.height - ground.height,
    game.screen.width,
    118
  );
  ctx.drawImage(player, game.player.x, game.player.y);

  if (game.start == "started") {
    game.player.y += game.gravity;
  }
}

function render() {
  ctx.drawImage(background, 0, 0);

  draw();

  requestAnimationFrame(render);
  ctx.font = "24px monospace";
  ctx.fillStyle = "orange";
  ctx.fillText("SCORE: " + game.score, 50, 50);
}

function reset() {
  game = {
    start: "pause", // "started" "pause" "gameover"
    blocks: [],
    screen: {
      width: 600,
      height: 500
    },
    gravity: 1.5,
    score: 0,
    images: {
      player: "images/head.png",
      background: "images/background.png",
      ground: "images/ground.png",
      blockN: "images/blockN.png",
      blockS: "images/blockS.png"
    },
    sounds: {
      click: "sounds/fly.mp3",
      score: "sounds/score.mp3",
      gameover: "sounds/yandin.m4a"
    },
    player: {
      x: 10,
      y: 150
    }
  };

  canvas.width = game.screen.width;
  canvas.height = game.screen.height;

  game.blocks[0] = {
    x: canvas.width / 2,
    y: 0
  };
}

resizeWindow();
render();

function captureKey(e) {
  let key = e.code;

  if ((key == "KeyW") | (key == "ArrowUp") | (key == "Space")) {
    game.player.y -= 30;
    clickSound.play();
    game.start = "started";
  }

  if (key == "KeyP") {
    if (game.start == "pause") {
      game.start = "started";
    } else {
      game.start = "pause";
    }
  }
}
function captureTouch(e) {
  let key = e.type;

  if (key == "touchstart") {
    game.player.y -= 30;
    clickSound.play();
    game.start = "started";
  }
}
function resizeWindow() {
  if (innerWidth <= game.screen.width) {
    game.screen.width = innerWidth;
    canvas.width = innerWidth;
  } else {
    game.screen.width = 600;
    canvas.width = 600;
  }
}

/*
 * Events
 */
window.addEventListener("keydown", captureKey);
window.addEventListener("touchstart", captureTouch);
window.addEventListener("resize", resizeWindow);

/*
 * Console logger
 */
function log(x) {
  console.log(x);
}
