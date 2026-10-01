type RAFCallback = (delta: number) => void;

export class RAFCollection {
  private static callbacks = new Set<RAFCallback>();

  static add(callback: RAFCallback): void {
    this.callbacks.add(callback);
  }

  static remove(callback: RAFCallback): void {
    this.callbacks.delete(callback);
  }

  static forEach(fn: (callback: RAFCallback) => void): void {
    this.callbacks.forEach(fn);
  }

  static clear(): void {
    this.callbacks.clear();
  }
}
