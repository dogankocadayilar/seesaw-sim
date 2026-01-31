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
  },
  generateNextWeight() {
    this.nextWeight = Math.round(Math.random() * 9) + 1;
  },
  addObject(weight, distanceFromCenter, side) {
    this.objects.push({ weight, distanceFromCenter, side });
  },
};
