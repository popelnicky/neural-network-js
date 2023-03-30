import { BaseView } from "./BaseView.js";

export class WorkerNodeView extends BaseView {
  constructor(id) {
    super();

    this.id = id;
  }

  init() {
    this.$view = document.createElement("div");

    this.$view.classList.add("worker-node-view");
    this.$view.classList.add(this.id);

    this.$view.innerHTML = `<svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                              <line class="neural-network-item nn-item-line" x1="60" y1="12" x2="60" y2="36" />
                              <circle class="neural-network-item nn-item-outter-circle" cx="60" cy="60" r="40"/>
                              <circle class="neural-network-item nn-item-inner-circle" cx="60" cy="60" r="20"/>
                            </svg>`;
  }
}
