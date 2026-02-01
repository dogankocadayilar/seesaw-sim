export const Physics = {
  calculateTorque(objects) {
    const torques = objects.map(
      (object) => object.distanceFromCenter * object.weight,
    );
    return torques.reduce((a, b) => a + b, 0);
  },
  calculateWeightSum(objects) {
    return objects.reduce((a, b) => a + b.weight, 0);
  },
  calculateAngle(rightTorque, leftTorque) {
    return Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 50));
  },
  calculateDistanceFromCenter(mouseX, elementRectToCalculate) {
    // Calculate center of the element
    const plankCenter =
      elementRectToCalculate.left + elementRectToCalculate.width / 2;
    // Calculate mouse position from center
    const xFromCenter = mouseX - plankCenter;
    // Return format of "1.1"
    return parseFloat(Math.abs(xFromCenter)).toFixed(1);
  },
  calculateSide(mouseX, elementRectToCalculate) {
    // Calculate center of the element
    const plankCenter =
      elementRectToCalculate.left + elementRectToCalculate.width / 2;
    // Calculate mouse position from center
    const xFromCenter = mouseX - plankCenter;
    return xFromCenter > 0 ? "right" : "left";
  },
};
