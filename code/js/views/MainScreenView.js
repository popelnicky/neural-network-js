export default class MainScreenView {
  constructor() {
    this.$view = null;
  }

  get template() {
    return `<div class="left-view"></div>
            <div class="center-view"></div>
            <div class="right-view"></div>`;
  }

  init() {
    this.$view = document.createElement("div");
    this.$view.classList.add("main-layout");
    this.$view.innerHTML = this.template;

    document.body.append(this.$view);
  }
}