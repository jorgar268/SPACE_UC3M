const imgnave = new Image();
imgnave.src = "./assets/img/nave.png";

class Nave {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0; //velocidad
    this.width = 40;
    this.height = 30;
    this.weight = 1; //para la gravedad peso de la nave
  }
  update() {
    let curve = Math.sin(angle);

    //para cada frame(como incrementen pos y vel Y)
    if (this.y > canvas.height - this.height + curve) {
      //nos aseguramos de que no se salga del canvas(xabajo)
      this.y = canvas.height - this.height + curve;
      //this.y=canvas.height - (this.height*4);
    } else {
      //lo que hace que se caiga
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      //nos aseguramos de que no se salga  del canvas(xarriba)
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed) this.jump();
  }
  draw() {
    ctx.fillStyle = "red";
    //ctx.fillRect(this.x,this.y,this.width, this.height); collision area, figura que se esconde debajo de foto
    ctx.drawImage(
      imgnave,
      this.x - 12,
      this.y - 12,
      this.width * 2,
      this.height * 2
    );
  }
  jump() {
    this.vy -= 2;
  }
}
// const nave = new Nave();
let nave = new Nave();
