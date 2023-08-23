export class Debouncer {
  count: number;

  constructor() {
    this.count = 1;
  }

  debounce(fn: () => void) {
    if (this.count < 1) return;

    this.count--;
    fn();
    setTimeout(() => { this.count++; }, 0);
  }
};
