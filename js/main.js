import { Physics } from "./physics.js";
import { State } from "./state.js";
import { UI } from "./ui.js";
import { Utils } from "./utils.js";

const Elements = {
  nextWeight: document.getElementById("nextWeight"),
  leftWeight: document.getElementById("leftWeight"),
  rightWeight: document.getElementById("rightWeight"),
  angle: document.getElementById("angle"),
  seesawResetBtn: document.getElementById("seesawResetBtn"),
  seesawLogs: document.getElementById("seesawLogs"),
  seesawContainer: document.getElementById("seesawContainer"),
  seesawClickable: document.getElementById("seesawClickable"),
  seesawPlank: document.getElementById("seesawPlank"),
  distance: document.getElementById("distance"),
};

const CONFIG = { GHOST_TOP: 140, LINE_TOP: 160, GHOST_STARTING_Y: -1000 };

Elements.seesawResetBtn.addEventListener("click", resetSeesaw);
Elements.seesawClickable.addEventListener("click", handleClick);
Elements.seesawClickable.addEventListener("mousemove", handleMove);
Elements.seesawClickable.addEventListener("mouseout", () => {
  if (activeGhost) {
    UI.removeElements(activeGhost, activeLine);
  }
});

// Refresing clientRect on resize
let seesawPlankRect = seesawPlank.getBoundingClientRect();
let seesawContainerRect = seesawContainer.getBoundingClientRect();

window.addEventListener("resize", handleResize);

function handleResize() {
  seesawPlankRect = seesawPlank.getBoundingClientRect();
  seesawContainerRect = seesawContainer.getBoundingClientRect();
}

// Initiliaze the application
function initApp() {
  const saved = State.loadFromLocalStorage();
  if (saved) {
    State.generateNextWeight();
    State.updatePhysics();
    UI.generateObjects(State.objects, Elements.seesawPlank);
    UI.generateLogs(State.objects, Elements.seesawLogs);
    UI.updateStats(Elements, State);
    UI.rotate(Elements.seesawPlank, State.angle);
  } else {
    resetSeesaw();
  }
}

// Reset state and UI
function resetSeesaw() {
  State.reset();
  UI.generateObjects(State.objects, Elements.seesawPlank);
  UI.updateStats(Elements, State);
  UI.rotate(Elements.seesawPlank, State.angle);
  Elements.seesawPlank.innerHTML = "";
  Elements.seesawLogs.innerHTML = "";
}

// Current mouse position on x plane needed for re-creating the ghost object
let currentX = "50%";

let activeGhost = null;
let activeLine = null;

function handleMove(e) {
  const mouseX = e.clientX;
  const ghostConfig = {
    x: currentX,
    y: activeGhost ? activeGhost.style.top : CONFIG.GHOST_STARTING_Y + "px",
    nextWeight: State.nextWeight,
    size: Utils.getObjectSize(State.nextWeight),
  };

  UI.removeElements(activeGhost, activeLine);

  const { ghost, line } = UI.createGhost(Elements.seesawContainer, ghostConfig);

  activeGhost = ghost;
  activeLine = line;

  // Realtime distance meter
  const distanceFromCenter = Physics.calculateDistanceFromCenter(
    mouseX,
    seesawPlankRect,
  );
  distance.textContent = `Distance to center is : ${distanceFromCenter}px`;

  // Mouse x position on screen
  let mousePosX = mouseX - seesawContainerRect.left;
  // Plank distance to container element
  const diff = seesawPlankRect.left - seesawContainerRect.left;

  const minX = diff;
  const maxX = seesawPlankRect.width + diff;
  // Limit the movement of ghost object
  mousePosX = Utils.limit(minX, maxX, mousePosX);
  currentX = mousePosX + "px";

  if (activeGhost) {
    activeGhost.style.left = currentX;
    activeGhost.style.top = CONFIG.GHOST_TOP + "px";
  }

  if (activeLine) {
    activeLine.style.left = currentX;
    activeLine.style.top = CONFIG.LINE_TOP + "px";
  }
}

function handleClick(e) {
  if (activeGhost) {
    const mouseX = e.clientX;
    const side = Physics.calculateSide(mouseX, seesawPlankRect);
    const distanceFromCenter = Physics.calculateDistanceFromCenter(
      mouseX,
      seesawPlankRect,
    );
    const color = Utils.getRandomRGB();

    State.addObject(State.nextWeight, distanceFromCenter, side, color);

    UI.createLog(
      Elements.seesawLogs,
      State.nextWeight,
      distanceFromCenter,
      side,
    );

    State.generateNextWeight();
    State.updatePhysics();

    UI.generateObjects(State.objects, Elements.seesawPlank);
    UI.rotate(Elements.seesawPlank, State.angle);
    UI.updateStats(Elements, State);

    State.saveToLocalStorage();
  }
}

// initialize when all dom elements loaded
window.addEventListener("DOMContentLoaded", initApp);
