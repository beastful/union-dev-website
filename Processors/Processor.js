export default class Processor {
  constructor(gltf) {
    this.__processors__ = [];
    this.gltf = gltf;
  }
  processor(el) {
    this.__processors__.push(el);
    return this;
  }
  process() {
    this.gltf.children.map((obj) => {
      this.__processors__.map((el) => {
        el.step(obj);
      });
    });
    this.__processors__.map((el) => {
      if (el.compute) el.compute();
    });
    return this.gltf;
  }
}
