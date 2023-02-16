import { BaseView } from "./BaseView.js";
import { NotificationView } from "./NotificationView.js";
import { RecognizerView } from "./RecognizerView.js";
import { UploadView } from "./UploadView.js";

export class MainScreenView extends BaseView {
  constructor() {
    super();
  }

  init() {
    new UploadView().init();
    new RecognizerView().init();
    new NotificationView().init();
  }
}
