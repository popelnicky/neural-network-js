import { NodeCommand } from "../models/NodeCommand.js";
import { Utils } from "../services/Utils.js";
import { MainScreenView } from "../views/MainScreenView.js";
import { Package } from "../models/Package.js";
import { PixelModel } from "../models/PixelModel.js";
import { Serializer } from "../services/Serializer.js";
import { NodeStatus } from "../models/NodeStatus.js";

export class MainController {
  constructor() {
    this.node = null;

    this.pool = [];

    this.packSize = 1024;
  }

  run() {
    this.node = new Worker("network.min.js");

    this.initListeners();
  }

  operate(pkg) {
    switch (pkg.type) {
      case NodeStatus.READY: {
        if (pkg.payload) {
          document.dispatchEvent(
            new CustomEvent("draw_result", {
              detail: Serializer.decode(pkg.payload),
            })
          );
        }

        if (this.pool.length == 0) {
          return;
        }

        let pack = [];

        if (this.pool.length > this.packSize) {
          pack = this.pool.splice(0, this.packSize);
        } else {
          pack = this.pool;

          this.pool = [];
        }

        this.send(NodeCommand.OPERATE, pack);

        break;
      }
      case NodeStatus.BUSY:
      case NodeStatus.ON:
      case NodeStatus.OFF: {
        setTimeout(() => {
          this.send(NodeCommand.GET_STATUS);
        }, 1000);

        break;
      }
      default: {
      }
    }
  }

  send(resp, payload = null) {
    this.node.postMessage(
      new Package(resp, payload ? Serializer.encode(payload) : payload)
    );
  }

  initListeners() {
    window.addEventListener("load", () => {
      new MainScreenView().init();
    });

    this.node.addEventListener("message", (resp) => {
      this.operate(resp.data);
    });

    document.addEventListener("got_pixels", async (ev) => {
      const pixels = await this.preparePixels(ev.detail);

      this.pool = Utils.shuffle(pixels);

      this.send(NodeCommand.GET_STATUS);
    });
  }

  preparePixels(payload) {
    return new Promise((resolve, reject) => {
      const result = [];
      const colors = payload.data;
      const width = payload.width;

      let x = 0;
      let y = 0;

      for (let i = 0; i < colors.length; i += 4) {
        let [red, green, blue] = [colors[i], colors[i + 1], colors[i + 2]];

        result.push(new PixelModel(red, green, blue, x++, y));

        if (x >= width) {
          x = 0;
          y++;
        }
      }

      resolve(result);
    });
  }
}
