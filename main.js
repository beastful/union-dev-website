import "./style.css";
import Track from "./Track";
import Engine from "./Engine";
import SceneController from "./SceneController";

const engine = new Engine();
const manger = new SceneController();

const track = new Track({
  length: 1200,
  local: (local) => {
    document.getElementById("track").style.height = local * 100 + "%";
  },
});

const about = new Track({
  takes: 25, // 25%
  local: (local) => {
    document.getElementById("about").style.height = local * 100 + "%";
  },
});
const projects = new Track({
  takes: 25,
  local: (local) => {
    document.getElementById("projects").style.height = local * 100 + "%";
  },
});
const comunity = new Track({
  takes: 25,
  local: (local) => {
    document.getElementById("comunity").style.height = local * 100 + "%";
  },
});
const joinus = new Track({
  takes: 25,
  local: (local) => {
    document.getElementById("joinus").style.height = local * 100 + "%";
  },
});

track.add(about);
track.add(projects);
track.add(comunity);
track.add(joinus);

projects.add(
  new Track({
    takes: 25,
    local: (local) => {
      document.getElementById("pr1").style.height = local * 100 + "%";
      manger.rotateStage1CubeX(Math.PI * 2 * local * 0.25);
    },
  })
);
projects.add(
  new Track({
    takes: 25,
    local: (local) => {
      document.getElementById("pr2").style.height = local * 100 + "%";
      manger.rotateStage1CubeZ(Math.PI * 2 * local * 0.25);
    },
  })
);
projects.add(
  new Track({
    takes: 25,
    local: (local) => {
      document.getElementById("pr3").style.height = local * 100 + "%";
      manger.rotateStage1CubeX(Math.PI * 2 * local * 0.25 * -1);
    },
  })
);
projects.add(
  new Track({
    takes: 25,
    local: (local) => {
      document.getElementById("pr4").style.height = local * 100 + "%";
      manger.rotateStage1CubeX(Math.PI * 2 * local * 0.25);
    },
  })
);

let n = 0;
engine.on("update", () => {
  if (n < 1200) n += 0.9;
  track.go(n);
});
