import Uploader from "./components/Uploader";
import Target from "./components/Target";
import Result from "./components/Result";

[Uploader, Target, Result].forEach(component => {
  // eslint-disable-next-line new-cap
  new component();
});