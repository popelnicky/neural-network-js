import { ColorModel } from "./ColorModel.js";

export class PixelModel {
  constructor(red, green, blue, x, y) {
    this.r = red;
    this.g = green;
    this.b = blue;

    this.x = x;
    this.y = y;
  }
}
