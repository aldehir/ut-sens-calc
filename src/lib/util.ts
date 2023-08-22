export function validValues(values) {
  return values.every((x) => x > 0 && !Number.isNaN(x) && x !== null);
}

export class Debouncer {
  constructor() {
    this.count = 1;
  }

  debounce(fn) {
    if (this.count < 1) return;

    this.count--;
    fn();
    setTimeout(() => { this.count++; }, 0);
  }
};
