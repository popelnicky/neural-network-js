import { ColorModel } from "../models/ColorModel.js";
import { NodeCommand } from "../models/NodeCommand.js";
import { NodeStatus } from "../models/NodeStatus.js";
import { Package } from "../models/Package.js";
import { PixelModel } from "../models/PixelModel.js";
import { NeuralNetwork } from "../services/NeuralNetwork.js";
import { Serializer } from "../services/Serializer.js";

export class NetworkController {
  constructor() {
    this.status = NodeStatus.OFF;

    this.pool = [];

    this.neuralNode = new NeuralNetwork();
  }

  async run() {
    this.status = NodeStatus.ON;

    self.addEventListener("message", (req) => {
      this.operate(req.data);
    });

    await this.neuralNode.train();

    this.status = NodeStatus.READY;
  }

  async operate(pkg) {
    switch (pkg.type) {
      case NodeCommand.GET_STATUS: {
        this.send(this.status);

        break;
      }
      case NodeCommand.OPERATE: {
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

  send(req, payload = null) {
    self.postMessage(
      new Package(req, payload ? Serializer.encode(payload) : payload)
    );
  }

  recognize(pixels) {
    this.status = NodeStatus.BUSY;

    return new Promise((resolve, reject) => {
      const result = [];

      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        let recognized = this.neuralNode.recognize(
          new ColorModel(pixel.r, pixel.g, pixel.b)
        );

        result.push(
          new PixelModel(
            recognized.r,
            recognized.g,
            recognized.b,
            pixel.x,
            pixel.y
          )
        );
      }

      this.status = NodeStatus.READY;

      resolve(result);
    });
  }
}
