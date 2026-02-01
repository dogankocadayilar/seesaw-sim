export const Utils = {
  getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  getRandomRGB() {
    return `rgb(${this.getRandomNumber(100, 0)}, ${this.getRandomNumber(100, 0)}, ${this.getRandomNumber(100, 0)}`;
  },

  limit(min, max, number) {
    return Math.max(min, Math.min(max, number));
  },
  getObjectSize(weight) {
    return weight * 4 + 20;
  },
};
