import { BaseView } from "./BaseView.js";

export class UploadView extends BaseView {
  constructor() {
    super();

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
                                    <input class="upload-input" type="file" name="file">
                                    <label class="upload-label" for="picture">Choose a pic</label>
                                    <span>or drag it here</span>
                                </div>
                            </form>`;

    document.body.append(this.$view);

    this.$uploader = document.querySelector(".upload-container");
    this.$input = document.querySelector(".upload-input");
    this.$label = document.querySelector(".upload-label");

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
    ].forEach((event) => {
      this.$uploader.addEventListener(event, (e) => {
        e.preventDefault();
      });
    });

    // ["dragover", "dragenter"].forEach((event) => {
    //   this.$uploader.addEventListener(event, () => {
    //     this.$uploader.classList.add("dragover");
    //   });
    // });

    // this.$uploader.addEventListener("dragleave", (data) => {
    //   var dx = data.pageX - this.$uploader.offsetLeft;
    //   var dy = data.pageY - this.$uploader.offsetTop;
    //   if (
    //     dx < 0 ||
    //     dx > this.$uploader.width ||
    //     dy < 0 ||
    //     dy > this.$uploader.height
    //   ) {
    //     this.$uploader.classList.remove("dragover");
    //   }
    // });

    this.$uploader.addEventListener("drop", (data) => {
      this.$uploader.classList.remove("dragover");

      this.handle(data.dataTransfer.files[0]);
    });

    // this.$input.addEventListener("change", () => {
    //   var event = new CustomEvent("file_uploaded", {
    //     detail: this.files,
    //   });

    //   // document.dispatchEvent(event);

    //   console.log(event);
    // });
  }

  handle(file) {
    if (file.type == "image/jpeg" || file.type == "image/png") {
      const reader = new FileReader();

      reader.addEventListener("loadend", (resp) => {
        const img = new Image();

        img.addEventListener("load", () => {
          document.dispatchEvent(
            new CustomEvent("pic_uploaded", {
              detail: resp.target.result,
            })
          );
        });

        img.src = resp.target.result;
      });

      reader.readAsDataURL(file);
    } else {
    }
  }
}
