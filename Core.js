export default class Core {
    static instan = {};
    static events = {};
    constructor() {
      this.Store = Core.instan;
      this.Event = Core.events;
    }
}