import { ImageView } from "./ImageView.js";

export class OriginalImageView extends ImageView {
  constructor(container) {
    super(container);
  }

  initListeners() {
    super.initListeners();

    document.addEventListener("pic_uploaded", (event) => {
      this.clear();

      const img = new Image();

      img.addEventListener("load", () => {
        this.$canvas.width = img.naturalWidth;
        this.$canvas.height = img.naturalHeight;

        this.context = this.$canvas.getContext("2d");

        this.context.drawImage(img, 0, 0);
      });

      img.src = event.detail;
    });
  }
}
