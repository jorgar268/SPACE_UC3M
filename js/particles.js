let particlesArray = [];
class Particle {
  constructor() {
    this.x = nave.x; //queremos que salgan de la nave igual que los disparos
    this.y = nave.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    //generar color aleatorio
    this.color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  }
  update() {
    //mov particulas
    this.x -= gamespeed;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
//metemos partículas nuevas con los métodos de las mismas
function handleParticles() {
  particlesArray.unshift(new Particle());
  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  //vigilamos que no sean mas de 200
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]); //splice?
    }
  }
}
