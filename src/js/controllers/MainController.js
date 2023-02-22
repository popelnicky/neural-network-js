import { Utils } from "../services/Utils.js";
import { MainScreenView } from "../views/MainScreenView.js";
import { Pixel } from "../models/Pixel.js";

export class MainController {
  constructor() {
    this.pool = [];

    this.packSize = 1024;

    this.mainView = null;
  }

  run() {
    this.mainView = new MainScreenView();

    this.mainView.init();

    this.waitPic();
  }

  async waitPic() {
    const pic = await this.mainView.getUploadedPic();

    if (pic) {
      await this.mainView.drawOriginal(pic);

      const originalSize = this.mainView.getOriginalSize();

      this.mainView.prepareResultView(originalSize);

      const imageData = this.mainView.getOriginalData();
      const pixels = await this.getPixels(imageData);

      this.pool = Utils.shuffle(pixels);
    }

    this.waitPic();
  }

  getPixels(imageData) {
    return new Promise((resolve, reject) => {
      const result = [];

      if (!imageData) {
        resolve(result);

        return;
      }

      const colors = imageData.data;
      const width = imageData.width;

      let x = 0;
      let y = 0;

      for (let i = 0; i < colors.length; i += 4) {
        let [red, green, blue] = [colors[i], colors[i + 1], colors[i + 2]];

        result.push(new Pixel(red, green, blue, x++, y));

        if (x >= width) {
          x = 0;
          y++;
        }
      }

      resolve(result);
    });
  }

  setResult(result) {
    this.mainView.drawResult(result);
  }
}