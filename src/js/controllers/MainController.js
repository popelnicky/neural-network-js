import { MainScreenView } from "../views/MainScreenView.js";
import { WorkerNodes } from "./WorkerNodes.js";

export class MainController {
  constructor() {
    this.workerNodes = null;
    this.mainView = null;
  }

  dispatchTo(id, state) {
    this.workerNodes.dispatchTo(id, state);
  }

  run() {
    this.mainView = new MainScreenView(this);
    this.mainView.init();

    this.workerNodes = new WorkerNodes(this);
  }

  async handlePicture(pic) {
    if (pic) {
      this.mainView.clearViews();

      await this.mainView.drawOriginal(pic);

      const originalSize = this.mainView.getOriginalSize();

      this.mainView.prepareResultView(originalSize);

      const imageData = this.mainView.getOriginalData();

      this.workerNodes.recognize(imageData);
    }
  }

  setResult(result) {
    this.mainView.drawResult(result);
  }
}
