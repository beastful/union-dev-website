import "./style.css";
import GameMap from "./Processors/GameMap";
import Screens from "./Processors/Screens";
import BoundMesh from "./Processors/BoundMesh";
import StyleMap from "./Processors/StyleMap";
import ProceduralAddressing from "./Addressing/ProceduralAddressing";
import Engine from "./Engine/Engine";
import { AmbientLight, LoadingManager, TextureLoader } from "three";
import Preload from "./Loaders/Preload";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import model from "./models/coridor_re.glb?url";
import Core from "./Events/Core";
import anime from "animejs";
import App from "./Engine/App";
import { lerp } from "three/src/math/mathutils";
import coridor_ao from "./textures/coridor_1k_bake_compressed.png?url";
import croom_ao from "./textures/croom_1k_bake_compressed.png?url";
import env_map from "./textures/env.png?url";

const preload = new Preload();
const store = new Core();
const manager = new LoadingManager();

preload.asset(new GLTFLoader(manager).loadAsync(model));
preload.asset(new TextureLoader(manager).loadAsync(coridor_ao));
preload.asset(
  new Promise((res) => {
    res();
  })
);
preload.asset(new TextureLoader(manager).loadAsync(croom_ao));
preload.asset(new TextureLoader(manager).loadAsync(env_map));
preload.load();

const bar = document.getElementById("loading-progress");
const path = document.getElementById("loading-path");

manager.onProgress = (url, loaded, total) => {
  bar.style.width = 100 * (loaded / total) + "%";
  path.innerHTML = url;
};

preload.on("load", () => {
  const gameMap = new GameMap(store.Store.asset[0].scene);
  const screensMap = new Screens();
  const boundMesh = new BoundMesh();
  const styleMap = new StyleMap();

  const units = gameMap
    .processor(screensMap)
    .processor(styleMap)
    .processor(boundMesh)
    .process();

  const build = new ProceduralAddressing((save, obj3D) => {
    const arr = [0, 0, 1, 0, 0, 0, 1, 2];
    const gateSize = boundMesh.gateSize;
    const boardSize = boundMesh.boardSize;
    const roles = boundMesh.roles;

    let gc = 0;
    let bc = 0;
    let rc = 0;

    // roles.map((role) => {
    //   obj3D.add(role.mesh);
    //   role.mesh.position.z = -12 - rc * 0.9;
    //   role.mesh.position.x = -1;
    //   role.mesh.position.y = -0.5;
    //   rc++;
    // });

    arr.map((n, i) => {
      if (n == 0) {
        const boardUnit = boundMesh.board.clone();
        boardUnit.position.z = -(boardSize.z * bc + gateSize.z * gc);
        obj3D.add(boardUnit);
      }
      if (n == 1) {
        const gateUnit = boundMesh.gate.clone();
        gateUnit.position.z = -(
          boardSize.z * bc +
          gateSize.z * gc -
          boardSize.z
        );
        obj3D.add(gateUnit);
        if (gc == 0) save(gateUnit, "gateOne");
        if (gc == 1) save(gateUnit, "gateTwo");
      }
      if (n == 2) {
        const roomUnit = boundMesh.room.clone();
        console.log(roomUnit);
        roomUnit.position.z = -(
          boardSize.z * bc +
          gateSize.z * gc -
          boardSize.z -
          gateSize.z
        );
        obj3D.add(roomUnit);
      }

      if (n == 0) bc += 1;
      if (n == 1) gc += 1;
    });
  });

  const engine = new Engine();
  window.onresize = () => {
    engine.resize();
  };
  engine.scene.add(build.object3D);

  engine.camera.position.z = 3;
  engine.camera.position.y = 0;

  const app = new App(document.getElementById("app"));

  anime
    .timeline({
      duration: 1000,
      easing: "linear",
    })
    .add({
      targets: "#loading",
      opacity: 0,
      complete: (anim) => {
        setTimeout(() => {
          anim.animatables[0].target.style.display = "none";
        }, 200);
      },
    })
    .add(
      {
        targets: "#header-layer1",
        width: 0,
      },
      "-=100"
    );

  const tl = anime
    .timeline({
      duration: 1000,
      easing: "linear",
      autoplay: false,
    })
    .add({
      targets: "#header, #scroll-call",
      translateY: ["-50%", -100],
      translateX: ["-50%", "-50%"],
      opacity: 0,
    })
    .add({
      targets: [engine.camera.position],
      z: [0, -4],
    })
    .add({
      targets: [
        build.addres["gateOne"].children[5].position,
        build.addres["gateOne"].children[1].position,
        build.addres["gateOne"].children[2].position,
      ],
      x: -1,
      duration: 400,
    })
    .add(
      {
        targets: [
          build.addres["gateOne"].children[3].position,
          build.addres["gateOne"].children[6].position,
          build.addres["gateOne"].children[4].position,
        ],
        x: 1,
        duration: 400,
      },
      "-=400"
    )
    .add({
      targets: [engine.camera.position],
      z: [-4, -9],
    })
    .add({
      targets: ".about-svg-paragraph, #about-stroke-top, .about-svg-header",
      opacity: 1,
    })
    .add({
      targets: "#about-stroke-cnt",
      strokeDashoffset: [anime.setDashoffset, 0],
    })
    .add({
      targets: "#about-svg-container",
      translateY: ["-50%", -100],
      translateX: ["-50%", "-50%"],
      scale: [
        window.innerWidth > 500 ? 1 : 0.69,
        window.innerWidth > 500 ? 1 : 0.69,
      ],
      opacity: 0,
    })
    .add({
      targets: ".wwd-grid-el",
      scale: [0, 1],
      delay: anime.stagger(200, { grid: [4, 5], from: "center" }),
    })
    .add({
      targets: "#wwd-header div",
      translateX: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
    })
    .add({
      targets: ".wwd-paragraph",
      translateX: [100, 0],
      opacity: [0, 1],
    })
    .add({
      targets: "#wwd-stroke-cnt",
      strokeDashoffset: [anime.setDashoffset, 0],
    })
    .add({
      targets: "#what-we-do",
      translateY: ["-50%", -100],
      translateX: ["-50%", "-50%"],
      opacity: [1, 0],
    })
    .add({
      targets: [engine.camera.position],
      z: [-9, -20],
    })
    .add({
      targets: [
        build.addres["gateTwo"].children[5].position,
        build.addres["gateTwo"].children[1].position,
        build.addres["gateTwo"].children[2].position,
      ],
      x: -1,
      duration: 400,
    })
    .add(
      {
        targets: [
          build.addres["gateTwo"].children[3].position,
          build.addres["gateTwo"].children[6].position,
          build.addres["gateTwo"].children[4].position,
        ],
        x: 1,
        duration: 400,
      },
      "-=400"
    )
    .add({
      targets: [engine.camera.position],
      z: [-20, -31],
      y: [0, -0.35],
    })
    .add({
      targets: [".projects-container", engine.camera.position],
      opacity: [0, 1],
      y: [-0.35, -0.35],
    })
    .add({
      targets: "#projects-scroller",
      left: -document.getElementById("projects-scroller").offsetWidth,
      duration: 5000,
    })
    .add({
      targets: "#projects-header",
      opacity: [1, 0],
    })
    .add(
      {
        targets: ".join-us",
        opacity: [0, 1],
        changeBegin: () => {
          document.getElementsByClassName("join-us")[0].style.zIndex = 3;
        },
      },
      "-=400"
    );

  let scrollPos = 0;
  engine.on("update", () => {
    scrollPos = lerp(
      scrollPos,
      tl.duration *
        (app.app.scrollTop / (app.app.scrollHeight - window.innerHeight) > 1
          ? 1
          : app.app.scrollTop / (app.app.scrollHeight - window.innerHeight)),
      0.1
    );
    tl.seek(scrollPos);
  });
});
