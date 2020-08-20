import {EventConstants} from "../EventConstants";

export default class Uploader {
  constructor() {
    this.$parent = document.querySelector(".input-container");
    
    this.$element = document.createElement("div");
    this.$element.id = "upload-container";
    this.$element.innerHTML = this.template;

    this.$parent.append(this.$element);

    this.addEventListeners();
  }

  get template() {
    return `<img id="upload-image" src="/assets/upload-image-icon.png">
            <div>
                <input id="picture" type="file" name="file">
                <label id="label-picture" for="picture">Select a picture</label>
                <span>or drag & drop here</span>
            </div>`;
  }

  addEventListeners() {
    const $picture = document.getElementById("picture");
    const $label = document.getElementById("label-picture");
    
    $picture.addEventListener("focus", () => {
      $label.classList.add("focus");
    });
    
    $picture.addEventListener("focus", () => {
      $label.classList.remove("focus");
    });

    ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(event => {
      this.$element.addEventListener(event, () => {
        return false;
      });
    });

    this.$element.addEventListener("dragover", event => {
      event.preventDefault();
    });

    ["dragover", "dragenter"].forEach(event => {
      this.$element.addEventListener(event, () => {
        this.$element.classList.add("dragover");
      });
    });

    this.$element.addEventListener("dragleave", data => {
      let dx = data.pageX - this.$element.offsetLeft;
      let dy = data.pageY - this.$element.offsetTop;

      if ((dx < 0) || (dx > this.$element.clientWidth) || (dy < 0) || (dy > this.$element.clientHeight)) {
        this.$element.classList.remove("dragover");
      }
    });

    this.$element.addEventListener("drop", event => {
      event.preventDefault();

      this.$element.classList.remove("dragover");

      const ev = new CustomEvent(EventConstants.FILE_UPLOADED, { detail: event.dataTransfer.files[0] });

      document.dispatchEvent(ev);
    });

    this.$element.addEventListener("change", () => {
      const ev = new CustomEvent(EventConstants.FILE_UPLOADED, { detail: $picture.files[0] });

      document.dispatchEvent(ev);
    });
  }
}