// Object state weight, distanceFromCenter, side

export const State = {
  objects: [],
  nextWeight: 0,
  leftWeight: 0,
  rightWeight: 0,
  angle: 0,

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
