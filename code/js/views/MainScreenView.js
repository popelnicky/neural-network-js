import NeuralNetworkMainView from "./NeuralNetworkMainView.js";

export default class MainScreenView {
  constructor() {
    this.$view = null;
  }

  get template() {
    return `<div class="picture-view"></div>
            <div class="neural-network-view"></div>
            <div class="result-view"></div>`;
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("main-view");
    this.$view.innerHTML = this.template;

    document.body.append(this.$view);

    const neuralNetworkView = new NeuralNetworkMainView();

    neuralNetworkView.init();
  }
}