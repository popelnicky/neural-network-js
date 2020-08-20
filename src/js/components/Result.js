import {EventConstants} from "../EventConstants";

export default class Result {
  constructor() {
    const $parent = document.querySelector(".output-container");

    this.$element = document.createElement("div");
    this.$element.classList.add("result-picture");
    this.$element.classList.add("target-result-back");
    this.$element.innerHTML = this.template;

    $parent.append(this.$element);

    this.addEventListeners();
  }

  get template() {
    return `<canvas id="result" style="width: auto; height: 100%;"></canvas>`;
  }

  addEventListeners() {
    document.addEventListener(EventConstants.FILE_UPLOADED, event => {
      const file = event.detail;

      if (file && (file.type == "image/jpeg" || file.type == "image/png")) {
        const canvas = document.getElementById("result");
        const img = new Image();

        img.addEventListener("load", () => {
          const context = canvas.getContext("2d");

          context.clearRect(0, 0, canvas.width, canvas.height);

          canvas.width = img.width;
          canvas.height = img.height;

          context.drawImage(img, 0, 0);

          const pixels = context.getImageData(0, 0, img.width, img.height);

          this.$element.classList.remove("target-result-back");
        });

        img.src = window.URL.createObjectURL(file);

        return;
      }

      // TODO: Implement file uploading issues notification
    });
  }
}