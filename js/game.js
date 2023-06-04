let canvas;
let world;
let keyboard;
let soundChecked;
let musicChecked;

/**
 * loading canvas
 */
function init() {
  canvas = document.getElementById("canvas");
}

function musicCheck(checked, checkbox, sound) {
  if (checked) {
    checkbox.checked = true;
    sound();
  } else {
    checkbox.checked = false;
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 740) {
    document.location.reload();
  }
});

/**
 * Starting the game
 */
function startGame() {
  soundChecked = JSON.parse(localStorage.getItem("sound"));
  musicChecked = JSON.parse(localStorage.getItem("music"));
  let soundCheckbox = document.getElementById("soundToggle");
  let musicCheckbox = document.getElementById("musicToggle");
  musicCheck(soundChecked, soundCheckbox, soundOn);
  musicCheck(musicChecked, musicCheckbox, musicOn);
  initLevel();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  setTimeout(() => {
    addMenuButtons();
    if (window.innerHeight < 450) {
      document.getElementById("hud").classList.add("d-flex");
      document.getElementById("hud").classList.remove("d-none");
    }
  }, 500);
}

/**
 * menu button
 */
function addMenuButtons() {
  hideElement("startContainer");
  document.getElementById("menuButtonLine").classList.add("gameMenuButtonLine");
}

/**
 * settings button
 */
function settings() {
  hideElementAnimated("controlMenu");
  hideElementAnimated("infoMenu");
  showElementAnimated("settingsMenu");
}

/**
 * restart the game whenever you want
 */
function goBackToStartScreen() {
  document.location.reload();
}

/**
 * control button
 */
function control() {
  hideElementAnimated("settingsMenu");
  hideElementAnimated("infoMenu");
  showElementAnimated("controlMenu");
}

function info() {
  hideElementAnimated("controlMenu");
  hideElementAnimated("settingsMenu");
  showElementAnimated("infoMenu");
}

/**
 * close button
 */
function closeMenu() {
  hideElementAnimated("settingsMenu");
  hideElementAnimated("controlMenu");
  hideElementAnimated("infoMenu");
}

function doNotClose(event) {
  event.stopPropagation();
}

function showElement(element) {
  document.getElementById(`${element}`).classList.remove("d-none");
}

function showElementAnimated(element) {
  document.getElementById(`${element}`).classList.remove("vis-hidden");
  setTimeout(() => {
    document.getElementById(`${element}`).classList.remove("d-none");
  }, 400);
}

function hideElement(element) {
  document.getElementById(`${element}`).classList.add("d-none");
}

function hideElementAnimated(element) {
  document.getElementById(`${element}`).classList.add("vis-hidden");
  setTimeout(() => {
    document.getElementById(`${element}`).classList.add("d-none");
  }, 400);
}

/**
 * on/off sound
 */

function soundOn() {
  let sound;
  let soundChkbox = document.getElementById("soundToggle");
  if (soundChkbox.checked) {
    sound = true;
    localStorage.setItem("sound", sound);
    return sound;
  } else {
    sound = false;
    localStorage.setItem("sound", sound);
    return sound;
  }
}

/**
 * on/off music
 */
function musicOn() {
  let music;
  let musicCheckbox = document.getElementById("musicToggle");
  if (musicCheckbox.checked === true) {
    music = true;
    localStorage.setItem("music", music);
    return music;
  } else {
    music = false;
    localStorage.setItem("music", music);
    return music;
  }
}

/**
 * open fullscreen
 */
function fullscreen() {
  let container = document.getElementById("container");
  container.requestFullscreen();
  document.getElementById("container").classList.add("fullscreen");
  document.getElementById("canvas").classList.add("canvasFullscreen");
  document
    .getElementById("fullscreenButton")
    .setAttribute("onclick", `javascript: closeFullscreen()`);
  closeMenu();
}

/**
 * close fullscreen
 */
function closeFullscreen() {
  document.exitFullscreen();
  document.getElementById("container").classList.remove("fullscreen");
  document
    .getElementById("fullscreenButton")
    .setAttribute("onclick", `javascript: fullscreen()`);
}
