import { getRandom } from "../../../../utils";

interface ISmoke {
  ctx: CanvasRenderingContext2D
  img: HTMLImageElement
}

const OFFSET = 300;

export class Smoke implements ISmoke {
  ctx: CanvasRenderingContext2D
  img: HTMLImageElement
  width: number
  height: number
  sYFirst: number
  sHeightFirst: number
  sYSecond: number
  sHeightSecond: number
  counter: number
  constructor({ ctx, img }: ISmoke) {
    this.ctx = ctx;
    this.img = img;
    this.width = 0;
    this.height = 0;
    this.sYFirst = -this.img.height + OFFSET;
    this.sHeightFirst = this.img.height - 500;
    this.sYSecond = (-this.img.height * 2) + (OFFSET * 2);
    this.sHeightSecond = this.img.height - 500;
    this.counter = 0;
  }
  draw(windStrength: number) {
    this.ctx.globalAlpha = 0.1;
    this.ctx.drawImage(this.img,
      // source
      400,
      this.sYFirst * 2,
      this.img.width - 800,
      this.sHeightFirst,
      // destination
      0,
      0,
      this.width,
      this.height)
    this.ctx.drawImage(this.img,
      // source
      400,
      this.sYSecond * 2,
      this.img.width - 800,
      this.sHeightSecond,
      // destination
      0,
      0,
      this.width,
      this.height)
    this.ctx.drawImage(this.img,
      // source
      200,
      this.sYFirst,
      this.img.width - 400,
      this.sHeightFirst,
      // destination
      0,
      0,
      this.width,
      this.height)
    //if (this.sYFirst - 300 >= 0) {
    this.ctx.drawImage(this.img,
      // source
      200,
      this.sYSecond,
      this.img.width - 400,
      this.sHeightSecond,
      // destination
      0,
      0,
      this.width,
      this.height)


    //}
    this.ctx.globalAlpha = 1;
  }
  update(width: number, height: number, windStrength: number) {
    this.width = width
    this.height = height
    this.sYFirst += 3;
    this.sYSecond += 3;
    if (this.sYSecond - OFFSET >= 0 && this.sYFirst >= this.img.height) {
      this.sYFirst = -this.img.height + 800;
    }
    if (this.sYFirst - OFFSET >= 0 && this.sYSecond >= this.img.height) {
      this.sYSecond = -this.img.height + 800;
    }
  }
}