import EventEmmiter from "../Events/EventEmmiter";
import { Scene, PerspectiveCamera, WebGLRenderer, Clock } from "three";

export default class Engine extends EventEmmiter {
  static instance = null;
  constructor() {
    super();
    if (Engine.instance == null) {
      Engine.instance = this;
    }
    
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer({
      anntislias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.clock = new Clock();
    this.camera.position.z = 5;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(() => {
      this.emmit("update");
      this.renderer.render(this.scene, this.camera);
    });
    return Engine.instance;
  }
  resize() {
    this.emmit("resize");
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.updateProjectionMatrix();
  }
}
