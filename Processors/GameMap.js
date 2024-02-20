import {
  ACESFilmicToneMapping,
  AmbientLight,
  BasicDepthPacking,
  CineonToneMapping,
  Color,
  LinearToneMapping,
  PointLight,
  ReinhardToneMapping,
  SRGBColorSpace,
} from "three";
import Engine from "../Engine/Engine";
import Processor from "./Processor";
import { HemisphereLight } from "three";

export default class GameMap extends Processor {
  constructor(...args) {
    super(...args);
    this.engine = new Engine();
    this.engine.renderer.toneMapping = ACESFilmicToneMapping;
    this.engine.renderer.toneMappingExposure = 1.25;
    this.engine.renderer.outputColorSpace = SRGBColorSpace;
    this.engine.scene.add(new AmbientLight(0xffffff, 1));
    this.engine.scene.add(new HemisphereLight(0x757575, 0xffffff, 1));

    const plight = new PointLight(new Color("#fff"), 3);
    const plight2 = new PointLight(new Color("#fff"), 3);
    const plight3 = new PointLight(new Color("#fff"), 3);
    const plight4 = new PointLight(new Color("#fff"), 3);

    plight.position.z = -5;
    plight2.position.z = -10;
    plight3.position.z = -15;
    plight4.position.z = -28;

    this.engine.scene.add(plight);
    this.engine.scene.add(plight2);
    this.engine.scene.add(plight3);
    this.engine.scene.add(plight4);
  }
}
