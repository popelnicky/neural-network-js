import { NeuralNetworkItem } from "../constants/MainConstants.js";
import NeuralNetworkItemView from "./NeuralNetworkItemView.js";
export default class NeuralNetworkMainView {
  constructor() {
    this.$view = null;
  }

  get view() {
    return this.$view;
  }

  init() {
    this.$view = document.querySelector(".neural-network-view");

    NeuralNetworkItem.forEach(id => {
      const item = new NeuralNetworkItemView(id);

      item.init();

      this.$view.append(item.view);
    });
  }
}