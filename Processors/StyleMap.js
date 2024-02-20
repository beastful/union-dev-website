import {
  Color,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  MeshLambertMaterial,
} from "three";
import Core from "../Events/Core";
import { MeshDepthMaterial } from "three";
import { MeshToonMaterial } from "three";
import { MeshPhysicalMaterial } from "three";

export default class StyleMap extends Core {
  constructor() {
    super();
    this.aomap = this.Store.asset[1];
    this.croom_ao = this.Store.asset[3];
    this.env = this.Store.asset[4];
    this.env.mapping = EquirectangularReflectionMapping;
    this.aomap.flipY = false;
    this.croom_ao.flipY = false;
    this.env.flipY = false;
  }
  step(obj) {
    if (
      obj.name.startsWith("Board001") ||
      obj.name.startsWith("Gate") ||
      obj.name.startsWith("Door")
    ) {
      // obj.material = new MeshPhysicalMaterial({
      //   color: new Color("#fff"),
      //   aoMap: this.aomap,
      //   emissive: new Color("#757575"),
      //   envMap: this.env,
      //   map: this.env,
      //   metalness: 0.5,
      //   roughness: 0.6,
      //   reflectivity: 1,
      //   envMapIntensity: 0.5,
      // });
      obj.material = new MeshLambertMaterial({
        color: new Color("#fff"),
        emissive: new Color("#757575"),
        reflectivity: 0.8,
        aoMap: this.aomap,
        envMap: this.env,
      });
    }
    if (
      obj.name.startsWith("Board002") ||
      obj.name.startsWith("Board003") ||
      obj.name.startsWith("BoardScreen") ||
      obj.name == "Board"
    ) {
      obj.material = new MeshLambertMaterial({
        color: new Color("#fff"),
        emissive: new Color("#757575"),
        reflectivity: 0.8,
        envMap: this.env,
      });
    }
    if (obj.name.startsWith("ControlBoard")) {
      if (obj.type == "Group") {
        obj.children.map((child) => {
          child.material = new MeshLambertMaterial({
            color: new Color("#fff"),
            emissive: new Color("#757575"),
            reflectivity: 0.8,
            aoMap: this.croom_ao,
            envMap: this.env,
          });
        });
      }

      console.log(obj);
      obj.material = new MeshLambertMaterial({
        color: new Color("#fff"),
        emissive: new Color("#757575"),
        reflectivity: 0.8,
        aoMap: this.croom_ao,
        envMap: this.env,
      });
    }
  }
}
