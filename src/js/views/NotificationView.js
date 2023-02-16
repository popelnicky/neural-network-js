import { BaseView } from "./BaseView.js";

export class NotificationView extends BaseView {
  constructor() {
    super();
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("notification-view");

    document.body.append(this.$view);
  }
}
