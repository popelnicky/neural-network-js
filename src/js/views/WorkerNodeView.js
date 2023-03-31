import { NodeState } from "../constants/NodeState.js";
import { BaseView } from "./BaseView.js";

export class WorkerNodeView extends BaseView {
  constructor(id, parent) {
    super();

    this.parent = parent;
    this.id = id;
    this.enabled = false;
  }

  init() {
    this.$view = document.createElement("div");

    this.$view.classList.add("worker-node-view");
    this.$view.classList.add("worker-node-off");

    this.$view.innerHTML = `<div class="${this.id}"></div>`;
  }

  toggle() {
    this.$view.classList.toggle("worker-node-off");
    this.$view.classList.toggle("worker-node-on");

    this.enabled = !this.enabled;

    this.parent.sendStateTo(
      this.id,
      this.enabled ? NodeState.ON : NodeState.OFF
    );
  }
}
