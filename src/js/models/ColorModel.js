export class ColorModel {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  get R() {
    return this.red;
  }

  get G() {
    return this.green;
  }

  get B() {
    return this.blue;
  }
}
