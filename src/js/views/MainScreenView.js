import { BaseView } from "./BaseView.js";
import { NotificationView } from "./NotificationView.js";
import { RecognizerView } from "./RecognizerView.js";
import { UploadView } from "./UploadView.js";

export class MainScreenView extends BaseView {
  constructor(controller) {
    super();

    this.controller = controller;
    this.uploadView = null;
    this.recognizerView = null;
    this.notificationView = null;
  }

  init() {
    this.uploadView = new UploadView(this);
    this.recognizerView = new RecognizerView(this);
    this.notificationView = new NotificationView();

    this.uploadView.init();
    this.recognizerView.init();
    this.notificationView.init();
  }

  clearViews() {
    this.recognizerView.clearViews();
  }

  drawOriginal(pic) {
    return this.recognizerView.drawOriginal(pic);
  }

  async drawResult(pixels) {
    this.recognizerView.drawResult(pixels);
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

  sendStateTo(id, state) {
    this.controller.dispatchTo(id, state);
  }

  sendUploadedPic(pic) {
    this.controller.handlePicture(pic);
  }

  showNotification(notification) {
    this.notificationView.show(notification);
  }
}
