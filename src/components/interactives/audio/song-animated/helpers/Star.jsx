class Star {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 1;
      this.speed = Math.random() * 3 + 1;
    }

    // Actualizar posición de la estrella
    update() {
      this.y += this.speed;
      if (this.y > 650) {
        this.y = 0;
      }
    }

    // Mostrar la estrella
    show(p5) {
      p5.fill(255);
      p5.noStroke();
      p5.ellipse(this.x, this.y, this.size, this.size);
    }
  }

  export default Star;

