import { ImageView } from "./ImageView.js";

export class ResultView extends ImageView {
  constructor(container) {
    super(container);
  }

  initListeners() {
    super.initListeners();

    document.addEventListener("draw_result", (event) => {
      this.clear();
    });
  }
}
