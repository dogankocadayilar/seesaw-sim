import { Utils } from "./utils.js";

export const UI = {
  generateObjects(objects, element) {
    element.innerHTML = objects
      .map((object) => {
        const { weight, distanceFromCenter, side, color } = object;
        const size = Utils.getObjectSize(weight);
        // Get middle of the plank 0
        // Calculating object distance to middle of the plank with side variable
        const positionX =
          side === "right"
            ? `calc(50% + ${distanceFromCenter}px - ${size / 2}px)`
            : `calc(50% - ${distanceFromCenter}px - ${size / 2}px)`;

        return `<div class="object" style="width:${size}px; height:${size}px; left:${positionX}; background:${color}">${weight}kg</div>`;
      })
      .join("");
  },

  // Gonna call one time in init func
  // Its reverse bcs adding logs on top of the parent element
  generateLogs(objects, element) {
    element.innerHTML = objects
      .reverse()
      .map((object) => {
        const { weight, distanceFromCenter, side } = object;
        // 2kg dropped on left at 88.5px from center.
        return `<div class="log">${weight}kg dropped on ${side} at ${distanceFromCenter}px from center.</div>`;
      })
      .join("");
  },

  // Just update ui and plank angle
  updateStats(elements, state) {
    const { nextWeight, leftWeight, rightWeight, angle } = state;
    elements.nextWeight.textContent = nextWeight + " kg";
    elements.leftWeight.textContent = leftWeight + " kg";
    elements.rightWeight.textContent = rightWeight + " kg";
    elements.angle.textContent = angle + "°";
  },

  rotate(element, angle) {
    element.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  },

  // Create the object for ui state (ghost object)
  createGhost(container, config) {
    const ghost = document.createElement("div");
    ghost.className = "ghost-object";
    ghost.textContent = config.nextWeight + "kg";

    const size = config.size;
    ghost.style.width = size + "px";
    ghost.style.height = size + "px";
    ghost.style.left = config.x;
    ghost.style.top = config.y;

    const line = document.createElement("div");
    line.className = "ghost-line";
    line.style.height = 50 + "px";
    line.style.left = config.x;
    line.style.top = "-1000px";

    container.append(ghost, line);

    return { ghost, line };
  },

  // Remove element
  removeElements(...elements) {
    elements.forEach((el) => el?.remove());
  },

  createLog(element, weight, distanceFromCenter, side) {
    const log = document.createElement("div");
    log.className = "log";
    log.textContent = `${weight}kg dropped on ${side} at ${distanceFromCenter}px from center.`;

    // Inserting log to on top of the log container
    element.insertBefore(log, element.firstChild);
  },
};
