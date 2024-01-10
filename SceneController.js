import Engine from "./Engine";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Color,
  DirectionalLight,
  MeshLambertMaterial,
  AmbientLight,
} from "three";

export default class SceneController {
  constructor() {
    this.engine = new Engine();
    this.scene = this.engine.scene;
    this.camera = this.engine.camera;

    this.cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshLambertMaterial({
        color: new Color("red"),
      })
    );

    this.scene.add(new AmbientLight(0xffffff, 1));
    this.scene.add(new DirectionalLight(0xfff0ff, 1));
    this.scene.add(this.cube);
  }
  rotateStage1CubeX(x) {
    this.cube.rotation.x = x;
  }
  rotateStage1CubeY(y) {
    this.cube.rotation.y = y;
  }
  rotateStage1CubeZ(z) {
    this.cube.rotation.z = z;
  }
}
