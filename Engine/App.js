import { lerp } from "three/src/math/mathutils";
import Engine from "./Engine";

export default class App {
  constructor(app) {
    this.app = app;
    this.engine = new Engine();
    this.displacement = {
      x: 0,
      y: 0,
    };

    this.app.onscroll = (e) => {
      e.stopPropagation();
    };
    window.onscroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    this.resize();
    this.engine.on("resize", () => {
      this.resize();
    });
    this.engine.on("update", () => {
      this.engine.camera.position.x = lerp(
        this.engine.camera.position.x,
        this.displacement.x,
        0.1
      );
      this.engine.camera.position.y = lerp(
        this.engine.camera.position.y,
        this.displacement.y,
        0.1
      );
    });
  }
  resize() {
    this.app.style.height = window.innerHeight - 1 + "px";
    this.app.style.width = window.innerWidth + "px";
  }
}
