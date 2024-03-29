import { BaseView } from "./BaseView.js";

export class UploadView extends BaseView {
  constructor(parent) {
    super();

    this.parent = parent;
    this.$uploader = null;
    this.$input = null;
    this.$label = null;
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("upload-view");
    this.$view.innerHTML = `<form class="upload-container">
                                <img class="upload-image" src="/assets/upload-icon.png">
                                <div>
                                    <input id="picture" class="upload-input" type="file" name="file">
                                    <label class="upload-label" for="picture">Choose a pic</label>
                                    <span>or drag it here</span>
                                </div>
                            </form>`;

    document.body.append(this.$view);

    this.$uploader = document.querySelector(".upload-container");
    this.$input = document.querySelector(".upload-input");
    this.$label = document.querySelector(".upload-label");

    this.initListeners();
  }

  initListeners() {
    this.$input.addEventListener("focus", () => {
      this.$label.classList.add("focus");
    });

    this.$input.addEventListener("focusout", () => {
      this.$label.classList.remove("focus");
    });

    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ].forEach((ev) => {
      this.$uploader.addEventListener(ev, (e) => {
        e.preventDefault();
      });
    });

    ["dragover", "dragenter"].forEach((ev) => {
      this.$uploader.addEventListener(ev, () => {
        this.$uploader.classList.add("dragover");
      });
    });

    this.$uploader.addEventListener("dragleave", (data) => {
      var dx = data.pageX - this.$uploader.offsetLeft;
      var dy = data.pageY - this.$uploader.offsetTop;

      if (
        dx < 0 ||
        dx >= this.$uploader.offsetWidth ||
        dy < 0 ||
        dy >= this.$uploader.offsetHeight
      ) {
        this.$uploader.classList.remove("dragover");
      }
    });

    this.$uploader.addEventListener("drop", (ev) => {
      this.$uploader.classList.remove("dragover");

      this.operate(ev.dataTransfer.files[0]);
    });

    this.$input.addEventListener("change", (ev) => {
      this.operate(ev.target.files[0]);
    });
  }

  operate(file) {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();

      reader.addEventListener("load", (ev) => {
        this.parent.sendUploadedPic(ev.target.result);
      });

      reader.readAsDataURL(file);
    } else {
      this.parent.sendUploadedPic(null);
    }
  }
}
