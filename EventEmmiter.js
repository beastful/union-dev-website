import Core from "./Core";

export default class EventEmmiter extends Core {
  constructor() {
    super();
    this.event = [];
  }
  on(id, fun) {
    if (!this.event[id]) this.event[id] = [];
    this.event[id].push(fun);
  }
  emmit(id) {
    if (this.event[id])
      this.event[id].map((fun) => {
        fun();
      });
  }
}
