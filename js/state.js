import { Physics } from "./physics.js";

// Object state weight, distanceFromCenter, side

export const State = {
  objects: [],
  nextWeight: 0,
  leftWeight: 0,
  rightWeight: 0,
  angle: 0,

  updatePhysics() {
    const lefts = this.objects.filter((o) => o.side === "left");
    const rights = this.objects.filter((o) => o.side === "right");

    this.leftWeight = Physics.calculateWeightSum(lefts);
    this.rightWeight = Physics.calculateWeightSum(rights);

    const leftTorque = Physics.calculateTorque(lefts);
    const rightTorque = Physics.calculateTorque(rights);

    this.angle = Physics.calculateAngle(rightTorque, leftTorque);
  },

  reset() {
    this.objects = [];
    this.leftWeight = 0;
    this.rightWeight = 0;
    this.angle = 0;
    this.generateNextWeight();
    window.localStorage.removeItem("seesaw-state");
  },
  generateNextWeight() {
    this.nextWeight = Math.round(Math.random() * 9) + 1;
  },
  addObject(weight, distanceFromCenter, side, color) {
    this.objects.push({ weight, distanceFromCenter, side, color });
  },

  saveToLocalStorage() {
    const data = {
      objects: this.objects,
      nextWeight: this.nextWeight,
      leftWeight: this.leftWeight,
      rightWeight: this.rightWeight,
      angle: this.angle,
    };
    window.localStorage.setItem("seesaw-state", JSON.stringify(data));
  },

  loadFromLocalStorage() {
    const ls = window.localStorage.getItem("seesaw-state");
    if (ls) {
      const data = JSON.parse(ls);
      this.objects = data.objects;
      this.leftWeight = data.leftWeight;
      this.rightWeight = data.rightWeight;
      this.angle = data.angle;
      return true;
    }
    return false;
  },
};

// function updatePhysics() {
//   let angle;
//   let rightObjects;
//   let leftObjects;
//   let rightTorque;
//   let leftTorque;
//   let rightWeight;
//   let leftWeight;

//   rightObjects = State.objects.filter((object) => object.side === "right");
//   leftObjects = State.objects.filter((object) => object.side === "left");

//   rightWeight = Physics.calculateWeightSum(rightObjects);
//   leftWeight = Physics.calculateWeightSum(leftObjects);

//   rightTorque = Physics.calculateTorque(rightObjects);
//   leftTorque = Physics.calculateTorque(leftObjects);

//   angle = Physics.calculateAngle(rightTorque, leftTorque);

//   State.angle = parseFloat(angle).toFixed(1);
//   State.leftWeight = leftWeight;
//   State.rightWeight = rightWeight;
// }
