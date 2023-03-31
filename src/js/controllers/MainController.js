import { MainScreenView } from "../views/MainScreenView.js";
import { WorkerNodes } from "./WorkerNodes.js";
import { Notification as WorkerNotification } from "../constants/Notification.js";

export class MainController {
  constructor() {
    this.workerNodes = null;
    this.mainView = null;
  }

  dispatchTo(id, state) {
    this.workerNodes.dispatchTo(id, state);
  }

  //TODO
  async handlePicture(pic) {
    if (!pic) {
      this.mainView.showNotification(WorkerNotification.WRONG_PICTURE);
    }

    this.mainView.clearViews();

    await this.mainView.drawOriginal(pic);

    const originalSize = this.mainView.getOriginalSize();

    this.mainView.prepareResultView(originalSize);

    const imageData = this.mainView.getOriginalData();

    this.workerNodes.recognize(imageData);
  }

  //TODO
  progress(state) {
    this.mainView.showNotification(WorkerNotification[state]);
  }

  run() {
    this.mainView = new MainScreenView(this);
    this.mainView.init();

    this.workerNodes = new WorkerNodes(this);
  }

  setResult(result) {
    this.mainView.drawResult(result);
  }
}
