import { BaseView } from "./BaseView.js";

export class ImageView extends BaseView {
  constructor(container) {
    super();

    this.$view = document.querySelector(`.${container}`);
    this.$canvas = null;

    this.context = null;
  }

  init() {
    this.$canvas = document.createElement("canvas");

    this.$view.append(this.$canvas);

    this.initListeners();
  }

  initListeners() {
    document.addEventListener("clear", (event) => {
      this.clear();
    });
  }

  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
  }
}
