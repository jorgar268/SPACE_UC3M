let obstaclesArray = [];
const obsta = new Image();
obsta.src = "./assets/img/meteoirito2.png";

class Obstacle {
  constructor() {
    //aleatorio entre o y 1/3 del canvas (DIFICULTAD 3 MINIMA)
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 80;
    this.color = "red";
    //cada obstaculo que pasemos sumamos puntuacion
    this.puntua = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, 0 ,this.width,this.top);
    //ctx.fillRect(this.x, canvas.height -this.bottom ,this.width,this.bottom);

    ctx.drawImage(obsta, this.x, 0, this.width * 1.5, this.top * 1.1);
    ctx.drawImage(
      obsta,
      this.x,
      canvas.height - this.bottom,
      this.width * 1.5,
      this.bottom
    );
  }
  update() {
    this.x -= gamespeed;
    if (!this.puntua && this.x < nave.x) {
      score++;

      this.puntua = true;
    }
    this.draw();
  }
}
function handleObstacles() {
  if (frame % 100 === 0) {
    //cada 50 frames k es lo mismo k cada vez k sea divisible x 50
    //SUBIR Nº FRAMES PARA SEPARACIÓN ENTRE OBSTACULOS

    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}
