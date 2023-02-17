import { ImageView } from "./ImageView.js";

export class ResultView extends ImageView {
  constructor(container) {
    super(container);
  }

  initListeners() {
    super.initListeners();

    document.addEventListener("pic_uploaded", (ev) => {
      const img = new Image();

      img.addEventListener("load", () => {
        this.$canvas.width = img.naturalWidth;
        this.$canvas.height = img.naturalHeight;

        this.context = this.$canvas.getContext("2d", {
          willReadFrequently: true,
        });
      });

      img.src = ev.detail;
    });

    document.addEventListener("draw_result", (ev) => {
      // this.clear();

      const result = ev.detail;

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
    });
  }
}
