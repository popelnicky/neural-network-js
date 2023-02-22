import { ImageView } from "./ImageView.js";

export class OriginalImageView extends ImageView {
  constructor(container) {
    super(container);
  }

  draw(pic) {
    this.clear();

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.addEventListener("load", () => {
        this.setSize(new Size(img.naturalWidth, img.naturalHeight));

        this.refreshContext();

        this.context.drawImage(img, 0, 0);

        resolve();
      });

      img.src = pic;
    });
  }

  getImageData() {
    if (!this.context) {
      return null;
    }

    return this.context.getImageData(
      0,
      0,
      this.$canvas.width,
      this.$canvas.height
    );
  }
}
