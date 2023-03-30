import { BaseView } from "./BaseView.js";
import { WorkerNodeIds } from "../constants/WorkerNodeIds.js";
import { WorkerNodeView } from "./WorkerNodeView.js";

export class WorkerNodesView extends BaseView {
  constructor(container) {
    super();

    this.$view = document.querySelector(`.${container}`);
  }

  init() {
    WorkerNodeIds.forEach((id) => {
      const item = new WorkerNodeView(id);

      item.init();

      this.$view.append(item.view);
    });
  }
}
