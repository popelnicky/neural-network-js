import { BaseView } from "./BaseView.js";

export class NotificationView extends BaseView {
  constructor() {
    super();

    this.$container = null;
    this.$header = null;
    this.$body = null;
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("notification-view");

    this.$view.innerHTML = `<div class="no-notification">
                              <div class="timer"></div>
                              <div class="inner-wrapper">
                                <div class="notification-header"></div>
                                <div class="notification-body"></div>
                              </div>
                            </div>`;

    document.body.append(this.$view);

    this.$container = document.querySelector(".no-notification");
    this.$header = document.querySelector(".notification-header");
    this.$body = document.querySelector(".notification-body");
  }

  show(notification) {
    this.$header.innerText = notification.title;
    this.$body.innerText = notification.desc;

    this.toggle(notification.type);

    setTimeout(() => {
      this.toggle(notification.type);
    }, 2900);
  }

  toggle(type) {
    this.$container.classList.toggle("no-notification");
    this.$container.classList.toggle("notification");
    this.$container.classList.toggle(type);
    this.$container.classList.toggle("notification-time");
  }
}
