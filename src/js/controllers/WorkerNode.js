import { Color } from "../models/Color.js";
import { NodeCommand } from "../constants/NodeCommand.js";
import { NodeState } from "../constants/NodeState.js";
import { Package } from "../models/Package.js";
import { Pixel } from "../models/Pixel.js";
import { NeuralNetwork } from "../services/NeuralNetwork.js";
import { Serializer } from "../services/Serializer.js";
import { Pack } from "../models/Pack.js";
import { PackNote } from "../constants/PackNote.js";

export class WorkerNode {
  constructor() {
    this.id = "unknown";
    this.status = NodeState.OFF;
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
        this.status = NodeState.OFF;

        break;
      }
      case NodeCommand.ON: {
        if (!this.trained) {
          await this.neuralNode.train();

          this.trained = true;
        }

        this.status = NodeState.READY;

        break;
      }
      case NodeCommand.RECOGNIZE: {
        if (this.status != NodeState.READY) {
          break;
        }

        if (pkg.payload) {
          const pack = Serializer.decode(pkg.payload);

          this.status = NodeState.BUSY;

          const pixels = await this.recognize(pack.content);

          result = new Pack(pack.mark, pixels, PackNote.PROCESSED);

          this.status =
            this.status == NodeState.BUSY ? NodeState.READY : this.status;
        }

        break;
      }
      case NodeCommand.SET_ID: {
        this.id = Serializer.decode(pkg.payload);

        break;
      }
    }

    if (!result && pkg.payload) {
      const pack = Serializer.decode(pkg.payload);

      if (pack.note) {
        pack.note = PackNote.FOR_PROCESSING;

        result = pack;
      }
    }

    this.send(this.status, result);
  }

  send(msg, payload = null) {
    self.postMessage(
      new Package(this.id, msg, payload ? Serializer.encode(payload) : payload)
    );
  }

  async recognize(pixels) {
    const result = [];

    for (let pixel of pixels) {
      const recognized = this.neuralNode.recognize(
        new Color(pixel.r, pixel.g, pixel.b)
      );

      result.push(
        new Pixel(recognized.r, recognized.g, recognized.b, pixel.x, pixel.y)
      );
    }

    return result;
  }
}
