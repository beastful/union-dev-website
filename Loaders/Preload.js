import EventEmmiter from "../Events/EventEmmiter";

export default class Preload extends EventEmmiter {
  constructor() {
    super();
    this.assets = [];
  }
  asset(a) {
    this.assets.push(a);
  }
  load() {
    Promise.all(this.assets).then((a) => {
      this.Store.asset = a;
      this.Store.ready = true;
      this.emmit("load");
    });
  }
}
