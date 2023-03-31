import { ImageView } from "./ImageView.js";

export class ResultView extends ImageView {
  constructor(container) {
    super(container);
  }

  async draw(result) {
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      const pixel = this.context.createImageData(1, 1);

      [pixel.data[0], pixel.data[1], pixel.data[2], pixel.data[3]] = [
        item.r,
        item.g,
        item.b,
        255,
      ];

      this.context.putImageData(pixel, item.x, item.y);
    }
  }
}
