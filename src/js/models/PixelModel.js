import { ColorModel } from "./ColorModel.js";

export class PixelModel extends ColorModel {
  constructor(red, green, blue) {
    super(red, green, blue);

    this._x = 0;
    this._y = 0;
  }

  get x() {
    return this._x;
  }

  set x(val) {
    this._x = val;
  }

  get y() {
    return this._y;
  }

  set y(val) {
    this._y = val;
  }
}
