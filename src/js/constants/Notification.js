import { NotificationType } from "./NotificationType.js";

export const Notification = {
  COMPLETED: {
    type: NotificationType.SUCCESS,
    title: "Completed",
    desc: "Recognition has completed!",
  },
  NO_NODE: {
    type: NotificationType.WARN,
    title: "No nodes",
    desc: "Any node does not turned on",
  },
  PROCESSING_PICTURE: {
    type: NotificationType.ERROR,
    title: "Error",
    desc: "No chance to start new picture while the process is in progress",
  },
  START_PROCESS: {
    type: NotificationType.SUCCESS,
    title: "In progress",
    desc: "Recognition has started!",
  },
  WRONG_PICTURE: {
    type: NotificationType.ERROR,
    title: "Error",
    desc: "Wrong type of picture. Should be PNG or JPG.",
  },
};
