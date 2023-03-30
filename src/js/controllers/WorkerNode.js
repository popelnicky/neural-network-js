import { Color } from "../models/Color.js";
import { NodeCommand } from "../models/NodeCommand.js";
import { NodeStatus } from "../models/NodeStatus.js";
import { Package } from "../models/Package.js";
import { Pixel } from "../models/Pixel.js";
import { NeuralNetwork } from "../services/NeuralNetwork.js";
import { Serializer } from "../services/Serializer.js";

export class WorkerNode {
  constructor() {
    this.id = "unknown";
    this.status = NodeStatus.OFF;
    this.trained = false;
    this.pool = [];
    this.neuralNode = new NeuralNetwork();
  }

  run() {
    self.addEventListener("message", (req) => {
      this.operate(req.data);
    });
  }

  async operate(pkg) {
    let result = null;

    switch (pkg.msg) {
      case NodeCommand.OFF: {
        this.status = NodeStatus.OFF;

        break;
      }
      case NodeCommand.ON: {
        if (!this.trained) {
          await this.neuralNode.train();

          this.trained = true;
        }

        this.status = NodeStatus.READY;

        break;
      }
      case NodeCommand.RECOGNIZE: {
        if (this.status != NodeStatus.READY) {
          break;
        }

        if (pkg.payload) {
          const pixels = Serializer.decode(pkg.payload);

          this.status = NodeStatus.BUSY;

          result = await this.recognize(pixels);

          this.status =
            this.status == NodeStatus.BUSY ? NodeStatus.READY : this.status;
        }

        break;
      }
      case NodeCommand.SET_ID: {
        this.id = Serializer.decode(pkg.payload);

        break;
      }
    }

    this.send(this.status, result);
  }

  send(msg, payload = null) {
    self.postMessage(
      new Package(this.id, msg, payload ? Serializer.encode(payload) : payload)
    );
  }

  recognize(pixels) {
    return new Promise((resolve, reject) => {
      const result = [];

      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        let recognized = this.neuralNode.recognize(
          new Color(pixel.r, pixel.g, pixel.b)
        );

        result.push(
          new Pixel(recognized.r, recognized.g, recognized.b, pixel.x, pixel.y)
        );
      }

      resolve(result);
    });
  }
}
