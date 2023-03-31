import { BaseView } from "./BaseView.js";
import { WorkerNodesView } from "./WorkerNodesView.js";
import { OriginalImageView } from "./OriginalImageView.js";
import { ResultView } from "./ResultView.js";

export class RecognizerView extends BaseView {
  constructor(parent) {
    super();

    this.parent = parent;

    this.originalView = null;
    this.workerNodesView = null;
    this.resultView = null;
  }

  init() {
    const original = "original-view";
    const workerNodes = "worker-nodes-view";
    const result = "result-view";

    this.$view = document.createElement("div");
    this.$view.classList.add("recognizer-view");
    this.$view.innerHTML = `<div class="${original}"></div>
                            <div class="${workerNodes}"></div>
                            <div class="${result}"></div>`;

    document.body.append(this.$view);

    this.originalView = new OriginalImageView(original);
    this.workerNodesView = new WorkerNodesView(workerNodes, this);
    this.resultView = new ResultView(result);

    this.originalView.init();
    this.workerNodesView.init();
    this.resultView.init();
  }

  clearViews() {
    this.originalView.clear();
    this.resultView.clear();
  }

  drawOriginal(pic) {
    return this.originalView.draw(pic);
  }

  async drawResult(pixels) {
    this.resultView.draw(pixels);
  }

  getOriginalData() {
    return this.originalView.getImageData();
  }

  getOriginalSize() {
    return this.originalView.getSize();
  }

  prepareResultView(size) {
    this.resultView.setSize(size);
    this.resultView.refreshContext();
  }

  sendStateTo(id, state) {
    this.parent.sendStateTo(id, state);
  }
}
