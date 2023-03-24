let canvas = document.getElementById("canvas");
let world;
let walking;
let chicDim;
let character;
let keyboard = new Keyboard();

function init() {
  world = new World(canvas, keyboard);
  chicDim = world.level.enemies[0];
  character = world.character;
  // if(character.x + character.width >= chicDim.x){
  // console.log("yes chick");
  // }
  // console.log(character.x, chicDim.x);
  // console.log(chicDim.y, chicDim.height);
  // console.log(chicDim.y - chicDim.height);
}  

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (e.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (e.code === "ArrowDown") {
    keyboard.SPACE = true;
  }
  if (e.code === "ArrowUp") {
    keyboard.SPACE = true;
  }
  if (e.code === "Space") {
    keyboard.SPACE = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (e.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (e.code === "ArrowDown") {
    keyboard.SPACE = false;
  }
  if (e.code === "ArrowUp") {
    keyboard.SPACE = false;
  }
  if (e.code === "Space") {
    keyboard.SPACE = false;
  }
  if (e.code === "KeyD") {
    keyboard.KeyD = true;
  }
});
