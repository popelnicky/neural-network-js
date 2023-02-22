import { Size } from "../models/Size.js";
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
  }

  clear() {
    if (this.context) {
      this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
  }

  draw(data) {}

  getSize() {
    return new Size(this.$canvas.width, this.$canvas.height);
  }

  refreshContext() {
    this.context = this.$canvas.getContext("2d", {
      willReadFrequently: true,
    });
  }

  setSize(size) {
    this.$canvas.width = size.width;
    this.$canvas.height = size.height;
  }
}
