export class BaseView {
  constructor() {
    this.$view = null;
  }

  get view() {
    return this.$view;
  }

  init() {}
}
