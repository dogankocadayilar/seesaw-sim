import { State } from "./state.js";
import {
  getRandomRGB,
  getObjectSize,
  calculateTorque,
  calculateAngle,
  calculateWeightSum,
} from "./utils.js";

const nextWeight = document.getElementById("nextWeight");
const leftWeight = document.getElementById("leftWeight");
const rightWeight = document.getElementById("rightWeight");
const angle = document.getElementById("angle");

const seesawResetBtn = document.getElementById("seesawResetBtn");
const seesawLogs = document.getElementById("seesawLogs");
const seesawContainer = document.getElementById("seesawContainer");
const seesawClickable = document.getElementById("seesawClickable");
const seesawPlank = document.getElementById("seesawPlank");

seesawResetBtn.addEventListener("click", resetSeesaw);
seesawClickable.addEventListener("click", handleClick);
seesawClickable.addEventListener("mousemove", handleMove);
seesawClickable.addEventListener("mouseenter", createGhostObject);
seesawClickable.addEventListener("mouseleave", removeGhostObject);

// I didn't want to create ghost object over and over again thats why i used global variables for it
let ghostObject;
let line;

// Initiliaze the application
function initApp() {
  const saved = State.loadFromLocalStorage();
  if (saved) {
    generateObjects();
    generateLogs();
    updatePhysics();
    updateUI();
  } else {
    resetSeesaw();
  }
}

// Reset state and UI
function resetSeesaw() {
  State.reset();
  updateUI();
  seesawPlank.innerHTML = "";
  seesawLogs.innerHTML = "";
}

// Current mouse position on x plane needed for re-creating the ghost object
let currentX = "50%";

function handleMove(e) {
  // Getting clientRects on mouse movement so it doesn't breake on window resize
  const seesawContainerRect = seesawContainer.getBoundingClientRect();
  const seesawPlankRect = seesawPlank.getBoundingClientRect();

  let x = e.clientX - seesawContainerRect.left;

  // Plank distance to container element
  const diff = seesawPlankRect.left - seesawContainerRect.left;

  const minX = diff;
  const maxX = seesawPlankRect.width + diff;
  // Limit the movement of ghost object
  x = Math.max(minX, Math.min(x, maxX));
  currentX = x + "px";

  if (ghostObject) {
    ghostObject.style.left = currentX;
    ghostObject.style.top = 140 + "px";
  }

  if (line) {
    line.style.left = currentX;
    line.style.top = 160 + "px";
  }
}

function handleClick(e) {
  if (ghostObject) {
    const seesawPlankRect = seesawPlank.getBoundingClientRect();
    const plankCenter = seesawPlankRect.left + seesawPlankRect.width / 2;

    const xFromCenter = e.clientX - plankCenter;
    const side = xFromCenter > 0 ? "right" : "left";
    const distanceFromCenter = parseFloat(Math.abs(xFromCenter)).toFixed(1);

    const color = getRandomRGB();
    State.addObject(State.nextWeight, distanceFromCenter, side, color);

    createLog(State.nextWeight, distanceFromCenter, side);

    // createObject(distanceFromCenter, side);
    generateObjects();

    updatePhysics();
    updateUI();
    createGhostObject();

    State.saveToLocalStorage();
  }
}

// Gonna call one time in init func
// Its reverse bcs adding logs on top of the parent element
function generateLogs() {
  seesawLogs.innerHTML = State.objects
    .reverse()
    .map((object) => {
      const { weight, distanceFromCenter, side } = object;
      // 2kg dropped on left at 88.5px from center.
      return `<div class="log">${weight}kg dropped on ${side} at ${distanceFromCenter}px from center.</div>`;
    })
    .join("");
}

// Simple generate objects with map
function generateObjects() {
  seesawPlank.innerHTML = State.objects
    .map((object) => {
      const { weight, distanceFromCenter, side, color } = object;
      const size = getObjectSize(weight);

      // Get middle of the plank 0
      // Calculating object distance to middle of the plank with side variable
      const positionX =
        side === "right"
          ? `calc(50% + ${distanceFromCenter}px - ${size / 2}px)`
          : `calc(50% - ${distanceFromCenter}px - ${size / 2}px)`;

      return `<div class="object" style="width:${size}px; height:${size}px; left:${positionX}; background:${color}">${weight}kg</div>`;
    })
    .join("");
}

// Updating physics and state
function updatePhysics() {
  let angle;
  let rightObjects;
  let leftObjects;
  let rightTorque;
  let leftTorque;
  let rightWeight;
  let leftWeight;

  rightObjects = State.objects.filter((object) => object.side === "right");
  leftObjects = State.objects.filter((object) => object.side === "left");

  rightWeight = calculateWeightSum(rightObjects);
  leftWeight = calculateWeightSum(leftObjects);

  rightTorque = calculateTorque(rightObjects);
  leftTorque = calculateTorque(leftObjects);

  angle = calculateAngle(rightTorque, leftTorque);

  State.angle = parseFloat(angle).toFixed(1);
  State.leftWeight = leftWeight;
  State.rightWeight = rightWeight;
}

// Just update ui and plank angle
function updateUI() {
  State.generateNextWeight();

  nextWeight.textContent = State.nextWeight + " kg";
  leftWeight.textContent = State.leftWeight + " kg";
  rightWeight.textContent = State.rightWeight + " kg";
  angle.textContent = State.angle + "°";

  seesawPlank.style.transform = `translateX(-50%) rotate(${State.angle}deg)`;
}

// Create the object for ui state (ghost object)
function createGhostObject() {
  let posX = currentX;
  let posY = ghostObject ? ghostObject.style.top : "-1000px";

  // If there is already a ghost object remove it
  removeGhostObject();

  ghostObject = document.createElement("div");
  ghostObject.className = "ghost-object";
  ghostObject.textContent = State.nextWeight + "kg";

  ghostObject.style.width = getObjectSize(State.nextWeight) + "px";
  ghostObject.style.height = getObjectSize(State.nextWeight) + "px";

  ghostObject.style.left = posX;
  ghostObject.style.top = posY;

  line = document.createElement("div");
  line.className = "ghost-line";
  line.style.height = 50 + "px";

  line.style.left = posX;
  line.style.top = "-1000px";

  seesawContainer.append(ghostObject, line);
}

// Remove the ghost object
function removeGhostObject() {
  if (ghostObject) ghostObject.remove();
  if (line) line.remove();
}

function createLog(weight, distanceFromCenter, side) {
  const log = document.createElement("div");
  log.className = "log";
  log.textContent = `${weight}kg dropped on ${side} at ${distanceFromCenter}px from center.`;

  // Inserting log to on top of the log container
  seesawLogs.insertBefore(log, seesawLogs.firstChild);
}

// initialize when all dom elements loaded
window.addEventListener("DOMContentLoaded", initApp);
