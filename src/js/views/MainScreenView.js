import { BaseView } from "./BaseView.js";
import { NotificationView } from "./NotificationView.js";
import { RecognizerView } from "./RecognizerView.js";
import { UploadView } from "./UploadView.js";

export class MainScreenView extends BaseView {
  constructor() {
    super();

    this.uploadView = null;
    this.recognizerView = null;
    this.notificationView = null;
  }

  init() {
    this.uploadView = new UploadView();
    this.recognizerView = new RecognizerView();
    this.notificationView = new NotificationView();

    this.uploadView.init();
    this.recognizerView.init();
    this.notificationView.init();
  }

  drawOriginal(pic) {
    return this.recognizerView.drawOriginal(pic);
  }

  drawResult(pixels) {
    this.recognizerView.drawResult(pixels);
  }

  getUploadedPic() {
    return this.uploadView.getUploadedPic();
  }

  getOriginalData() {
    return this.recognizerView.getOriginalData();
  }

  getOriginalSize() {
    return this.recognizerView.getOriginalSize();
  }

  prepareResultView(size) {
    this.recognizerView.prepareResultView(size);
  }

  clearViews() {
    this.recognizerView.clearViews();
  }
}
