import { MainScreenView } from "./js/views/MainScreenView.js";

// const worker = new Worker("network.min.js");

// worker.addEventListener("message", (resp) => {
//   console.log("On the top page:");

//   if (resp.data.payload) {
//     console.log(JSON.parse(atob(resp.data.payload)));
//   }
// });

window.addEventListener("load", () => {
  new MainScreenView().init();
});
