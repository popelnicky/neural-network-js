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
  }

  sendStateTo(id, state) {
    this.parent.sendStateTo(id, state);
  }
}
