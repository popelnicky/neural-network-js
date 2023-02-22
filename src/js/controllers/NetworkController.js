import { Color } from "../models/Color.js";
import { NodeCommand } from "../models/NodeCommand.js";
import { NodeStatus } from "../models/NodeStatus.js";
import { Package } from "../models/Package.js";
import { Pixel } from "../models/Pixel.js";
import { NeuralNetwork } from "../services/NeuralNetwork.js";
import { Serializer } from "../services/Serializer.js";

export class NetworkController {
  constructor() {
    this.id = "unknown";
    this.status = NodeStatus.OFF;
    this.trained = false;
    this.pool = [];
    this.neuralNode = new NeuralNetwork();
  }

  async run() {
    self.addEventListener("message", (req) => {
      this.operate(req.data);
    });

    this.status = NodeStatus.ON;

    await this.neuralNode.train();

    this.trained = true;
    this.status = NodeStatus.READY;
  }

  async operate(pkg) {
    switch (pkg.msg) {
      case NodeCommand.SET_ID: {
        this.id = Serializer.decode(pkg.payload);

        this.send(this.status);

        break;
      }
      case NodeCommand.GET_STATUS: {
        this.send(this.status);

        break;
      }
      case NodeCommand.RECOGNIZE: {
        if (pkg.payload) {
          const pixels = Serializer.decode(pkg.payload);

          const result = await this.recognize(pixels);

          this.send(this.status, result);
        }

        break;
      }
      default: {
      }
    }
  }

  send(msg, payload = null) {
    self.postMessage(
      new Package(this.id, msg, payload ? Serializer.encode(payload) : payload)
    );
  }

  recognize(pixels) {
    this.status = NodeStatus.BUSY;

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

      this.status = NodeStatus.READY;

      resolve(result);
    });
  }
}
