// PUNTUACIÓN
const punt = document.querySelector("#punt");
const startGame = document.querySelector("#startGame");
const model = document.querySelector("#modelo");
const puntFinal = document.querySelector("#puntFinal");
// FIN PUNT
/* PARA JUEGO */
var elem = document.getElementById("canvas");

/* Function modo fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
// func init
function finish() {
  elem.style.display = "none";
  model.style.display = "flex";
}
//reiniciar todos los valores cada vex que se llame a init
function init() {
  elem.style.display = "flex";
  nave = new Nave();
  obstaclesArray = [];
  particlesArray = [];
  projectilesArray = [];
  enemiesArray = [];
  score = 0;
  frame = 0;
  monedas = 0;
  spacePressed = false;
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //context
canvas.width = 600;
canvas.height = 400;
let spacePressed = false;
let angle = 0;
let frame = 0;
let score = 0;
let gamespeed = 2; //controlar velocidades relativas de objetos fondo personaje
let monedas = 0;
// BACKGROUND
const background = new Image();
background.src = "./assets/img/bground.jpg";
//x1 posicion 1er bkg x2 pos 2
const B = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
function handleBackground() {
  if (B.x1 <= -B.width + gamespeed) B.x1 = B.width;
  else B.x1 -= gamespeed;

  if (B.x2 <= -B.width + gamespeed) B.x2 = B.width;
  else B.x2 -= gamespeed;

  ctx.drawImage(background, B.x1, B.y, B.width, B.height);
  ctx.drawImage(background, B.x2, B.y, B.width, B.height);
}
// fin bckg
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleObstacles();
  handleParticles();

  nave.update();
  nave.draw();
  //disparos
  projectilesArray.forEach((projectile) => {
    projectile.update();
  });
  //findisparos
  const point = new Audio("./assets/media/point.mp3");
  enemiesArray.forEach((enemy, index) => {
    enemy.update();
    projectilesArray.forEach((projectile, index2) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      //si se tocan:
      if (dist - enemy.radius - projectile.radius < 1) {
        enemiesArray.splice(index, 1);
        projectilesArray.splice(index2, 1);
        point.play();
        monedas++;
        //bolas explotan con animacion pero no termina de funcionar:
        // ctx.drawImage(choque,enemiesArray[index].x , enemiesArray[index].y, 300 , 300);
      }
    });
  });
  //puntuación
  ctx.fillStyle = "white";
  ctx.font = "50px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  //Monedas o puntos
  ctx.fillStyle = "yellow";
  ctx.font = "30px Georgia";
  ctx.strokeText(monedas, 550, 80);
  ctx.fillText(monedas, 550, 80);
  //
  handleCollisions();
  //parar juego cuando choque
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle++;
  frame++;
  //a aki
  //probar meterlo en if else lo de arriba
}
//aki lo de animate y tal
//sonido acelerar
const acelera = new Audio("./assets/media/acelera.mp3"); //probar a meter sonido en clase tal dentro del handletal
//callback function que actua al pulsar key
window.addEventListener("keydown", function (e) {
  console.log(e.code);
  e.preventDefault();
  if (e.code === "Space") spacePressed = true;
  console.log("funciona salto");
  acelera.play();
});
window.addEventListener("keyup", function (e) {
  // console.log(e.code)
  if (e.code === "Space") spacePressed = false;
});

const choque = new Image();
choque.src = "./assets/img/bang.png";
const audio = new Audio("./assets/media/bang.mp3");
const GAMEOVER = new Audio("./assets/media/GAME OVER.mp3");

//Mejora: if de colisiones (Math.hypot(nave.x-enemy.x,nave.y-enemy.y) - enemy.radius - nave.radius < 1)||

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      nave.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      nave.x + nave.width > obstaclesArray[i].x &&
      ((nave.y < 0 + obstaclesArray[i].top && nave.y + nave.height > 0) ||
        (nave.y > canvas.height - obstaclesArray[i].bottom &&
          nave.y + nave.height < canvas.height))
    ) {
      //colision detectada
      ctx.drawImage(choque, nave.x, nave.y, 100, 100);
      audio.play();
      window.setTimeout(GAMEOVER.play() , 15000);
      ctx.font = "25px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText(
        " Puntuación total :" + (score + monedas),
        160,
        canvas.height / 2 - 10
      );
      ctx.fillText(
        "Meteoritos destruidos :" + monedas,
        160,
        canvas.height / 2 - 40
      );
      // cancelAnimationFrame(frame);
      puntFinal.innerHTML = score + monedas;
      setTimeout(finish, 6000);
      //remove eventlistener de los sonidos
      return true;
    }
  }
}
// eventlistener boton de start
startGame.addEventListener("click", () => {
  init();
  animate();
  handleProjectiles(); //disp
  handleEnemies();

  model.style.display = "none";
  console.log("go");
});
