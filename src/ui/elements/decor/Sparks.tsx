import { ReactNode, createRef, RefObject, PureComponent } from "react";
import { Nullable } from "../../../common/types";

import smokeSrc from "assets/png/smoke.png"

import css from "./Particles.module.scss"
import { INTERVAL } from "../../../common/consts";
import { Smoke } from "./smoke";
import Spark from "./spark";

interface SparksProps {
  isMobileMode: boolean
  setCallback: (callback: (deltaTime: number) => void) => void
}

const smokeImg = new Image();

const PARTICLES_AMOUNT = 200;
const PARTICLES_AMOUNT_MOBILE = 50;

export class Sparks extends PureComponent<SparksProps> {

  canvasRef: RefObject<HTMLCanvasElement>
  canvas: Nullable<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D | null
  width: Nullable<number>
  height: Nullable<number>

  particlesAmount: number
  sparks: Array<Spark>
  smoke: Nullable<Smoke>
  windStrength: number

  now: number
  previous: number
  requestId: number

  constructor(props: SparksProps) {
    super(props);
    this.canvasRef = createRef()
    this.canvas = null
    this.ctx = null;

    this.width = null;
    this.height = null;

    this.sparks = [];
    this.particlesAmount = 50;
    this.smoke = null;
    this.windStrength = 0;

    this.now = Date.now();
    this.previous = this.now;
    this.requestId = 0;
  }

  loop = (deltaTime: number) => {
    if (deltaTime < INTERVAL) return
      if (this.ctx) {
        // this.ctx.fillStyle = "#202020"; //canvas filling color
        this.ctx.clearRect(0, 0, this.width!, this.height!); //apply filling color

        /* this.ctx.font = "48px sans-serif";
        this.ctx.fillText(this.windStrength.toString(), 10, 500); */
      }

      if (!this.smoke) {
        this.smoke = new Smoke({
          ctx: this.ctx!,
          img: smokeImg
        });
      } 

      this.particlesAmount = this.props.isMobileMode ? PARTICLES_AMOUNT_MOBILE : PARTICLES_AMOUNT;
      if (this.sparks.length !== this.particlesAmount) {
        this.sparks = [];
      }

      while (this.sparks.length < this.particlesAmount) {
        const size = this.getRandom(1, 10);
        const mass = 100 / size;
        const delay = this.getRandom(0, 200);
        const x = this.getRandom(0 + size, this.width! - size);
        //const y = this.getRandom(0, 100);
        const y = this.height!;
        const speedX = (this.windStrength/10*size);
        const speedY = this.getRandom((-200 / mass) - 10, (-100 / mass) - 1);
        //const speedY = this.getRandom(-1, -1, false);
        const red = 255;
        const green = this.getRandom(106, 210);
        const blue = 0;
        const alpha = Math.random() * 0.8;
        //const alpha = 1;

        const spark = new Spark(
          {
            ctx: this.ctx!,
            x,
            y,
            speedX,
            speedY,
            color: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
            size,
            mass,
            delay,
          }
        );
        this.sparks.push(spark);
      }
      
      this.smoke.update(this.width!, this.height!, this.windStrength);
      this.smoke.draw(this.windStrength);

      for (let i = 0; i < this.sparks.length; i++) {
        this.sparks[i].update(this.width!, this.height!, this.windStrength);
        //if (i < 5) {
          this.sparks[i].setStall()
        //}
        this.ctx!.beginPath();
        this.sparks[i].draw(this.windStrength);
        this.ctx!.closePath();
        //this.sparks[i].collisionDetect(this.sparks);
      }
      
      if (this.getRandom(0, 11) === 0) {
        const direction = this.getRandom(-1, 2, false)
        if (this.getRandom(0, 20) === 0) {
          if (this.windStrength > 4) {
            this.windStrength--;
          }
          if (this.windStrength < -1) {
            this.windStrength++;
          }
        }
        if (this.getRandom(0, 1000) === 0) {
          if (this.windStrength > 1) {
            this.windStrength--;
          }
        }
        if (this.getRandom(0, 50) === 0) {

          this.windStrength += direction;
        }
        this.windStrength += 0.2 * direction;
        this.windStrength = Number(this.windStrength.toFixed(2))
      }
  };

  getRandom(min: number, max: number, nullable: boolean = true) {
    let value: number
    do {
      value = Math.floor(Math.random() * (max - min)) + min;
    } while (nullable ? false : !value)
    return value;
  }

  componentDidMount() {  
    // image
    smokeImg.src = smokeSrc
    //set up the canvas
    this.canvas = this.canvasRef.current
    this.ctx = this.canvas!.getContext("2d");
    this.width = this.canvas!.width = window.innerWidth+20;
    this.height = this.canvas!.height = window.innerHeight+200;
    //start the animation
    smokeImg.onload = () => this.props.setCallback(this.loop);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.requestId)
  }

  render(): ReactNode {
    return <canvas ref={this.canvasRef} className={css.sparksContainer} />;
  }
}
