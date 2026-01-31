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

const seesawContainer = document.getElementById("seesawContainer");
const seesawClickable = document.getElementById("seesawClickable");
const seesawPlank = document.getElementById("seesawPlank");

seesawResetBtn.addEventListener("click", resetSeesaw);
seesawClickable.addEventListener("click", handleClick);
seesawClickable.addEventListener("mousemove", handleMove);
seesawClickable.addEventListener("mouseenter", createObject);
seesawClickable.addEventListener("mouseleave", removeObject);

let object;
let line;

// Initiliaze the application
function initApp() {
  State.reset();
  nextWeight.textContent = State.nextWeight + " kg";
}

// Reset state and UI
function resetSeesaw() {
  State.reset();
  updateUI();
}

function handleMove(e) {
  // Getting clientRects on mouse movement so it doesn't breake on window resize
  const seesawContainerRect = seesawContainer.getBoundingClientRect();
  const seesawPlankRect = seesawPlank.getBoundingClientRect();

  let x = e.clientX - seesawContainerRect.left - 50;

  // Plank distance to container element
  const diff = seesawPlankRect.left - seesawContainerRect.left;

  // Limit the movement of ghost object
  const minX = diff;
  const maxX = seesawPlankRect.width + diff;
  x = Math.max(minX, Math.min(x, maxX));

  if (object) {
    object.style.left = x + "px";
    // Calculate the object height realtime, object stays always in the same place
    object.style.top = 180 - parseInt(object.style.height) + "px";
  }

  if (line) {
    line.style.left = x + "px";
    line.style.top = 160 + "px";
  }
}

function handleClick(e) {
  if (object) {
    const rect = line.getBoundingClientRect();
    const seesawClickableRect = seesawClickable.getBoundingClientRect();
    const x = rect.x - seesawClickableRect.x;

    const center = seesawClickableRect.width / 2;

    const side = x > center ? "right" : "left";
    const distanceFromCenter = Math.abs(x - center);

    State.addObject(State.nextWeight, distanceFromCenter, side);

    State.generateNextWeight();

    updatePhysics();
    updateUI();
  }
}

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

  State.angle = angle;
  State.leftWeight = leftWeight;
  State.rightWeight = rightWeight;
}

function updateUI() {
  nextWeight.textContent = State.nextWeight + " kg";
  leftWeight.textContent = State.leftWeight + " kg";
  rightWeight.textContent = State.rightWeight + " kg";
  angle.textContent = State.angle + "°";
}

// Create the object for ui not state (ghost object)
function createObject(x) {
  if (object) object.remove();
  if (line) line.remove();

  object = document.createElement("div");
  object.className = "current-object";
  object.textContent = State.nextWeight + "kg";
  object.style.width = getObjectSize(State.nextWeight) + "px";
  object.style.height = getObjectSize(State.nextWeight) + "px";
  object.style.backgroundColor = getRandomRGB();

  line = document.createElement("div");
  line.className = "current-line";
  line.style.height = object.style.top + "px";

  seesawContainer.append(object, line);
}

// Remove the ghost object
function removeObject() {
  if (object) {
    object.remove();
  }

  if (line) {
    line.remove();
  }
}

window.addEventListener("DOMContentLoaded", initApp);
