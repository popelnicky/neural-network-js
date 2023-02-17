import { ImageView } from "./ImageView.js";

export class OriginalImageView extends ImageView {
  constructor(container) {
    super(container);
  }

  initListeners() {
    super.initListeners();

    document.addEventListener("pic_uploaded", (ev) => {
      this.clear();

      const img = new Image();

      img.addEventListener("load", () => {
        this.$canvas.width = img.naturalWidth;
        this.$canvas.height = img.naturalHeight;

        this.context = this.$canvas.getContext("2d", {
          willReadFrequently: true,
        });

        this.context.drawImage(img, 0, 0);

        const imgData = this.context.getImageData(
          0,
          0,
          this.$canvas.width,
          this.$canvas.height
        );

        setTimeout(() => {
          document.dispatchEvent(
            new CustomEvent("got_pixels", {
              detail: imgData,
            })
          );
        });
      });

      img.src = ev.detail;
    });
  }
}
