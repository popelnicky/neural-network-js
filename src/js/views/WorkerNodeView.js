import { NodeState } from "../constants/NodeState.js";
import { BaseView } from "./BaseView.js";
import { WorkerNodeIds } from "../constants/WorkerNodeIds.js";

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

    this.$view.innerHTML = `<label class="worker-node-switch">
                              <input type="checkbox">
                              <span class="${this.id} worker-node-slider"></span>
                            </label>`;

    this.initListeners();
  }

  initListeners() {
    this.$view.addEventListener("click", (ev) => {
      const nodeId = this.findNodeId(ev.target);
      
      if(nodeId) {
        this.toggle();
      }
    });
  }

  findNodeId(target) {
    for (let item of target.classList) {
      const nodeId = WorkerNodeIds.find((id) => id === item);

      if (nodeId) {
        return nodeId;
      }
    }

    return null;
  }

  toggle() {
    this.enabled = !this.enabled;

    this.parent.sendStateTo(
      this.id,
      this.enabled ? NodeState.ON : NodeState.OFF
    );
  }
}
