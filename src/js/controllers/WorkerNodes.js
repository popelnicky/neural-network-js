import { Package } from "../models/Package.js";
import { Pixel } from "../models/Pixel.js";
import { NodeCommand } from "../constants/NodeCommand.js";
import { NodeState } from "../constants/NodeState.js";
import { Serializer } from "../services/Serializer.js";
import { Utils } from "../services/Utils.js";
import { Pack } from "../models/Pack.js";
import { Node as WorkerNode } from "../models/Node.js";
import { PackNote } from "../constants/PackNote.js";

export class WorkerNodes {
  constructor(main) {
    this.main = main;
    this.nodes = {};
    this.pool = [];
  }

  dispatchTo(id, status) {
    let node = this.nodes[id];

    if (!node) {
      const worker = new Worker("network.min.js");

      node = new WorkerNode(worker, NodeState.OFF);

      this.nodes[id] = node;

      node.worker.addEventListener("message", (resp) => {
        this.operate(resp.data);
      });

      this.sendTo(node, NodeCommand.SET_ID, id);
    }

    this.sendTo(node, status, id);
  }

  getPack() {
    return this.pool.find((item) => item.note === PackNote.FOR_PROCESSING);
  }

  handleResult(payload) {
    if (!payload) {
      return;
    }

    const result = Serializer.decode(payload);
    const pack = this.pool.find((item) => item.mark === result.mark);

    if (!pack || !pack.note) {
      return;
    }

    pack.note = result.note;

    if (result.note === PackNote.PROCESSED) {
      this.main.setResult(result.content);
    }
  }

  //TODO
  async operate(pkg) {
    const node = this.nodes[pkg.from];

    node.state = pkg.msg;

    switch (pkg.msg) {
      case NodeState.READY: {
        this.handleResult(pkg.payload);

        if (this.pool.length === 0) {
          break;
        }

        let pack = this.getPack();

        if (!pack) {
          let lost = this.pool.filter(
            (item) => item.note === PackNote.IN_PROCESSING
          );

          for (let item of lost) {
            item.note = PackNote.FOR_PROCESSING;
          }

          pack = this.getPack();

          if (!pack) {
            this.pool = [];

            this.main.progress("COMPLETED");

            break;
          }
        }

        pack.note = PackNote.IN_PROCESSING;

        this.sendTo(node, NodeCommand.RECOGNIZE, pack);

        break;
      }
      case NodeState.BUSY:
      case NodeState.OFF:
      case NodeState.ON: {
        this.handleResult(pkg.payload);

        break;
      }
    }
  }

  prepareData(raw) {
    const result = [];

    if (!raw || !raw.data) {
      return;
    }

    const colors = raw.data;
    const width = raw.width;

    let x = 0;
    let y = 0;

    for (let i = 0; i < colors.length; i += 4) {
      let [red, green, blue] = [colors[i], colors[i + 1], colors[i + 2]];

      result.push(new Pixel(red, green, blue, x++, y));

      if (x >= width) {
        x = 0;
        y++;
      }
    }

    return Utils.shuffle(result);
  }

  //TODO
  async recognize(data) {
    if (this.pool.length > 0) {
      this.main.progress("PROCESSING_PICTURE");
      return;
    }

    let material = await this.prepareData(data);

    this.setToPool(material);

    let status = "NO_NODE";

    for (let id in this.nodes) {
      const node = this.nodes[id];

      if (node.state != NodeState.OFF) {
        status = "START_PROCESS";
      }

      this.sendTo(node, NodeCommand.GET_STATUS);
    }

    this.main.progress(status);
  }

  sendTo(node, msg, data = null) {
    const payload = data ? Serializer.encode(data) : data;

    node.worker.postMessage(new Package("main", msg, payload));
  }

  setToPool(data) {
    let next = 0;
    const size = 1024;

    while (next < data.length) {
      let end = data.length - next < size ? data.length : next + size;
      let patch = data.slice(next, end);

      this.pool.push(
        new Pack(`${next}...${end}`, patch, PackNote.FOR_PROCESSING)
      );

      next += size;
    }
  }
}
