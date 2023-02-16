import { BaseView } from "./BaseView.js";
import { NeuralNetworkView } from "./NeuralNetworkView.js";
import { OriginalImageView } from "./OriginalImageView.js";
import { ResultView } from "./ResultView.js";

export class RecognizerView extends BaseView {
  constructor() {
    super();
  }

  init() {
    const pictureView = "picture-view";
    const networkView = "neural-network-view";
    const resultView = "result-view";

    this.$view = document.createElement("div");
    this.$view.classList.add("recognizer-view");
    this.$view.innerHTML = `<div class="${pictureView}"></div>
                            <div class="${networkView}"></div>
                            <div class="${resultView}"></div>`;

    document.body.append(this.$view);

    new NeuralNetworkView(networkView).init();
    new OriginalImageView(pictureView).init();
    new ResultView(resultView).init();
  }
}
