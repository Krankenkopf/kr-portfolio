interface ISpark {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  speedX: number
  speedY: number
  color: string
  size: number
  mass: number
  delay: number
}

class Spark implements ISpark {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  color: string;
  size: number;
  mass: number;
  delay: number;
  isStall: boolean;
  stallRadius: number
  stallAngle: number
  stallAngleStep: number
  stallAngleAcceleration: number
  constructor({ ctx, x, y, speedX, speedY, color, size, mass, delay }: ISpark) {
    this.ctx = ctx;
    this.x = x; //horizontal position
    this.y = y; //vertical position
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.size = size;
    this.mass = mass;
    this.delay = delay;
    this.isStall = false;
    this.stallRadius = 100;
    this.stallAngle = 0;
    this.stallAngleStep = 2;
    this.stallAngleAcceleration = 1.01;
  }

  draw(windStrength: number) {
    if (this.delay) return

    this.ctx.save();
    if (this.y < window.innerHeight / 4 * 3 && !this.isStall) { 
      if (this.getRandom(0, 100) < windStrength) {
        this.isStall = true
      }
    }
      
      if (this.isStall) {
        this.ctx.translate(this.x + this.stallRadius, this.y)
        this.ctx.rotate(this.stallAngle * Math.PI / 180);
        this.stallAngle += this.stallAngleStep;
        this.stallAngleStep *= this.stallAngleAcceleration + this.size / 100;

        this.ctx.moveTo(-this.stallRadius, 0);
        this.ctx.lineTo(-this.stallRadius - (windStrength / 20 * this.size), Math.cos(this.stallAngle * Math.PI / 180) * this.size);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();

        this.ctx.moveTo(-this.stallRadius, 0);
        this.ctx.lineTo(-this.stallRadius - (windStrength / 20 * this.size), Math.cos(this.stallAngle * Math.PI / 180) * this.size);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ffff0010";
        this.ctx.stroke();

        this.ctx.moveTo(-this.stallRadius, 0);
        this.ctx.lineTo(-this.stallRadius - (windStrength / 20 * this.size), Math.cos(this.stallAngle * Math.PI / 180) * this.size);
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ff000010";
        this.ctx.stroke();

        this.ctx.moveTo(-this.stallRadius, 0);
        this.ctx.lineTo(-this.stallRadius - (windStrength / 20 * this.size), Math.cos(this.stallAngle * Math.PI / 180) * this.size);
        this.ctx.lineWidth = 7;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ff000010";
        this.ctx.stroke();
      } else {
        this.stallAngle = 0;
        this.stallAngleStep = 2;
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - (windStrength / 20 * this.size), this.y + this.size);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - (windStrength / 20 * this.size), this.y + this.size);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ffff0010";
        this.ctx.stroke();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - (windStrength / 20 * this.size), this.y + this.size);
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ff000010";
        this.ctx.stroke();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - (windStrength / 20 * this.size), this.y + this.size);
        this.ctx.lineWidth = 7;
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "#ff000010";
        this.ctx.stroke();



      }


    /* this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - (windStrength/20*this.size), this.y + this.size);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke(); */

    this.ctx.restore();

    /* this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - (windStrength/20*this.size), this.y + this.size);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke(); */

    /*   */
    //this.ctx.restore()
  }

  update(width: number, height: number, windStrength: number) {
    //update when reaching top
    if (this.x >= width || this.x <= 0 || this.y <= 0) {
      const dispersionSeed = this.getRandom(0, width + 520)
      this.y = height;
      this.x = this.getRandom(0, width + 20)
      if (dispersionSeed > width + 250) {
        this.y = this.getRandom(height - 500, height)
        this.x = width - 5;
      }
      if (dispersionSeed < 250) {
        this.y = this.getRandom(height - 500, height)
        this.x = 5;
      }
      this.speedY = this.getRandom((-200 / this.mass) - 10, (-100 / this.mass) - 1);
      this.isStall = false
    }
    // 
    //update position
    if (this.delay) {
      this.delay--;
    }
    this.speedY += 0.001;
    this.x += this.speedX + (windStrength * this.size);
    //this.x += this.speedX;
    this.y += this.speedY;
    //this.stallRadius += 0.0001;
  }

  setStall() {
    //this.ctx.save();
    //this.ctx.translate(this.x, this.y - 30);
    //this.ctx.rotate(this.stallRadius * Math.PI / 180);
    //this.stallRadius += 0.1;
  }

  collisionDetect(sparks: Array<Spark>) {
    for (let j = 0; j < sparks.length; j++) {
      if (this !== sparks[j]) {
        const dx = this.x - sparks[j].x;
        const dy = this.y - sparks[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + sparks[j].size) {
          const red = this.getRandom(0, 255);
          const green = this.getRandom(0, 255);
          const blue = this.getRandom(0, 255);

          sparks[j].color = this.color =
            "rgb(" + red + "," + green + "," + blue + ")";
        }
      }
    }
  }

  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Spark;
