import { BaseView } from "./BaseView.js";
import { NeuralNetworkItem } from "../constants/MainConstants.js";
import { NeuralNetworkItemView } from "./NeuralNetworkItemView.js";

export class NeuralNetworkView extends BaseView {
  constructor(container) {
    super();

    this.$view = document.querySelector(`.${container}`);
  }

  init() {
    NeuralNetworkItem.forEach((id) => {
      const item = new NeuralNetworkItemView(id);

      item.init();

      this.$view.append(item.view);
    });
  }
}
