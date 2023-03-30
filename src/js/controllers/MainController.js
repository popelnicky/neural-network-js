import { Utils } from "../services/Utils.js";
import { MainScreenView } from "../views/MainScreenView.js";
import { Pixel } from "../models/Pixel.js";
import { WorkerNodes } from "./WorkerNodes.js";

export class MainController {
  constructor() {
    this.workerNodes = null;
    this.mainView = null;
  }

  run() {
    this.mainView = new MainScreenView(this);
    this.mainView.init();

    this.workerNodes = new WorkerNodes(this);
  }

  // TODO
  async setPicture(pic) {
    if (pic) {
      this.mainView.clearViews();

      await this.mainView.drawOriginal(pic);

      const originalSize = this.mainView.getOriginalSize();

      this.mainView.prepareResultView(originalSize);

      const imageData = this.mainView.getOriginalData();
      const pixels = await this.getPixels(imageData);

      this.workerNodes.recognize(Utils.shuffle(pixels));
    }
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
