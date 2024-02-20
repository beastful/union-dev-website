import { Box3, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Core from "../Events/Core";

class Role extends Core {
  constructor(text) {
    super();
    this.text = text;
    this.mesh = new Mesh(
      new TextGeometry(this.text, {
        font: this.Store.asset[2],
        size: 0.09,
        height: 0.002,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.001,
        bevelOffset: 0,
        bevelSegments: 5,
      }),
      new MeshBasicMaterial({
        color: 0x000000,
      })
    );
  }
}

export default class BoundMesh {
  constructor() {
    this.gatePos = new Vector3();
    this.gateSize = new Vector3();
    this.boardPos = new Vector3();
    this.boardSize = new Vector3();
    this.roomPos = new Vector3();
    this.roomSize = new Vector3();
    this.gate = new Object3D();
    this.board = new Object3D();
    this.room = new Object3D();

    this.roles = [
      new Role("Ментор"),
      new Role("Разработчик"),
      new Role("Менеджер"),
    ];
  }
  step(obj) {
    if (obj.name.startsWith("Board")) {
      this.board.add(obj.clone());
    }
    if (obj.name.startsWith("Gate") || obj.name.startsWith("Door")) {
      this.gate.add(obj.clone());
    }
    if (obj.name.startsWith("Control")) {
      this.room.add(obj.clone());
    }
  }
  compute() {
    const gateBox = new Box3().setFromObject(this.gate);
    const boardBox = new Box3().setFromObject(this.board);
    const roomBox = new Box3().setFromObject(this.room);
    gateBox.getSize(this.gateSize);
    gateBox.getCenter(this.gatePos);
    boardBox.getSize(this.boardSize);
    boardBox.getCenter(this.boardPos);
    roomBox.getSize(this.roomSize);
    roomBox.getCenter(this.roomPos);
  }
}
