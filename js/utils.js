function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomRGB() {
  return `rgb(${getRandomNumber(100, 0)}, ${getRandomNumber(100, 0)}, ${getRandomNumber(100, 0)}`;
}

export function getObjectSize(weight) {
  return weight * 4 + 20;
}

export function calculateTorque(objects) {
  const torques = objects.map(
    (object) => object.distanceFromCenter * object.weight,
  );
  return torques.reduce((a, b) => a + b, 0);
}

export function calculateWeightSum(objects) {
  return objects.reduce((a, b) => a + b.weight, 0);
}

export function calculateAngle(rightTorque, leftTorque) {
  return Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 50));
}
