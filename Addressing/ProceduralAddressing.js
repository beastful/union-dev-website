import { Object3D } from "three";

export default class ProceduralAddressing {
  constructor(fun) {
    this.addres = {};
    this.object3D = new Object3D();
    fun((obj, link) => {
      this.save(obj, link);
    }, this.object3D);
  }
  save(obj, link) {
    this.addres[link] = obj;
  }
}
