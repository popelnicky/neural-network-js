import { MainScreenView } from "../views/MainScreenView.js";
import { WorkerNodes } from "./WorkerNodes.js";
import { Notification as WorkerNotification } from "../constants/Notification.js";
import { ProgressState } from "../constants/ProgressState.js";

export class MainController {
  constructor() {
    this.workerNodes = null;
    this.mainView = null;

    // TODO: Don't like it. Needs to improve
    this.inProgress = false;
  }

  dispatchTo(id, state) {
    this.workerNodes.dispatchTo(id, state);
  }

  async handlePicture(pic) {
    if (this.inProgress) {
      this.progress(ProgressState.PROCESSING_PICTURE);

      return;
    }

    if (!pic) {
      this.progress(ProgressState.WRONG_PICTURE);

      return;
    }

    this.mainView.clearViews();

    await this.mainView.drawOriginal(pic);

    const originalSize = this.mainView.getOriginalSize();

    this.mainView.prepareResultView(originalSize);

    const imageData = this.mainView.getOriginalData();

    this.workerNodes.recognize(imageData);

    this.inProgress = true;
  }

  progress(state) {
    this.mainView.showNotification(WorkerNotification[state]);

    if (state === ProgressState.COMPLETED) {
      this.inProgress = false;
    }
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
