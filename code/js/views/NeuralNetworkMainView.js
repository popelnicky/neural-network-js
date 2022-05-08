export default class NeuralNetworkMainView {
  constructor() {
    this.$view = null;
  }

  get template() {
    let result = "";

    for (let i = 0; i < 8; i++) {
      result = [result, `<div class="neural-network-item-view">
                          <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <line class="neural-network-item" x1="60" y1="12" x2="60" y2="36" />
                            <circle class="neural-network-item nn-item-out-circle" cx="60" cy="60" r="40"/>
                            <circle class="neural-network-item nn-item-in-circle" cx="60" cy="60" r="20"/>
                          </svg>
                         </div>`].join("");
    }
    
    return result;
  }

  init() {
    this.$view = document.querySelector(".neural-network-view");
    this.$view.innerHTML = this.template;
  }
}