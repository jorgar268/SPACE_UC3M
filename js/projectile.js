let projectilesArray = [];
let enemiesArray = [];
const meteor = new Image();
meteor.src = "./assets/img/meteor.png";

const bullet = new Image();
bullet.src = "./assets/img/bullet.png";

const laser = new Audio("./assets/media/laser.mp3");

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x; //queremos que salgan de la nave igual que los disparos
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();

    ctx.drawImage(bullet, this.x, this.y, this.radius * 5, this.radius * 5);
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
// const projectile = new Projectile(e.clientX,e.clientY,5,"red", {x:1,y:1});
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x; //queremos que salgan de la nave igual que los disparos
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    ctx.drawImage(
      meteor,
      this.x - 10,
      this.y - 15,
      this.radius * 2,
      this.radius * 2
    );
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
function handleEnemies() {
  setInterval(() => {
    const x = canvas.width;
    const y = canvas.height / 2 - 10;
    const radius = Math.random() * (40 - 10) + 10;
    const color = "green";
    const velocity = {
      x: -1,
      y: Math.random(),
    };
    enemiesArray.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}
// finenemigo

function handleProjectiles() {
  addEventListener("click", (e) => {
    //AÑADIR AUDIO DE PISTOLITA LASER
    laser.play();
    const angulo = Math.atan2(e.clientY - nave.y, e.clientX - nave.x);
    const velocity = {
      //x * 7 para subir la velocidad del proyectil
      x: Math.cos(angulo) * 7,
      y: Math.sin(angulo),
    };
    projectilesArray.push(new Projectile(nave.x, nave.y, 5, "red", velocity));
  });
}
