import { BaseView } from "./BaseView.js";
import { WorkerNodesView } from "./WorkerNodesView.js";
import { OriginalImageView } from "./OriginalImageView.js";
import { ResultView } from "./ResultView.js";

export class RecognizerView extends BaseView {
  constructor() {
    super();

    this.originalView = null;
    this.resultView = null;
  }

  init() {
    const pictureView = "picture-view";
    const networkView = "worker-nodes-view";
    const resultView = "result-view";

    this.$view = document.createElement("div");
    this.$view.classList.add("recognizer-view");
    this.$view.innerHTML = `<div class="${pictureView}"></div>
                            <div class="${networkView}"></div>
                            <div class="${resultView}"></div>`;

    document.body.append(this.$view);

    new WorkerNodesView(networkView).init();

    this.originalView = new OriginalImageView(pictureView);
    this.resultView = new ResultView(resultView);

    this.originalView.init();
    this.resultView.init();
  }

  drawOriginal(pic) {
    return this.originalView.draw(pic);
  }

  drawResult(pixels) {
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

  clearViews() {
    this.originalView.clear();
    this.resultView.clear();
  }
}
