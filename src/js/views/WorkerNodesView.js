import { BaseView } from "./BaseView.js";
import { WorkerNodeIds } from "../constants/WorkerNodeIds.js";
import { WorkerNodeView } from "./WorkerNodeView.js";

export class WorkerNodesView extends BaseView {
  constructor(container, parent) {
    super();

    this.parent = parent;
    this.$view = document.querySelector(`.${container}`);
    this.nodes = [];
  }

  init() {
    for (let id of WorkerNodeIds) {
      const node = new WorkerNodeView(id, this);

      this.nodes.push(node);

      node.init();

      this.$view.append(node.view);
    }

    this.initListeners();
  }

  initListeners() {
    this.$view.addEventListener("click", (ev) => {
      if (ev.target == this.$view) {
        return;
      }

      const node = this.findNode(ev.target);

      if (!node) {
        return;
      }

      node.toggle();
    });
  }

  findNode(target) {
    let nodeId = null;

    for (let item of target.classList) {
      nodeId = WorkerNodeIds.find((id) => id === item);

      if (nodeId) {
        break;
      }
    }

    return this.nodes.find((item) => item.id === nodeId);
  }

  sendStateTo(id, state) {
    this.parent.sendStateTo(id, state);
  }
}
