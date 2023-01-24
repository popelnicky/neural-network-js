import NeuralNetworkMainView from "./NeuralNetworkMainView.js";

export default class MainScreenView {
  constructor() {
    this.$view = null;
  }

  get view() {
    return this.$view;
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("main-view");
    this.$view.innerHTML = `<div class="picture-view"></div>
                            <div class="neural-network-view"></div>
                            <div class="result-view"></div>`;

    document.body.append(this.$view);

    const neuralNetworkView = new NeuralNetworkMainView();

    neuralNetworkView.init();
  }
}