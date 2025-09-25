export abstract class TestHarness<T extends HTMLElement> {
  constructor(public element: T) {
    this.initElementRefs();
  }

  public abstract initElementRefs(): void;

  public invalidate(): void {
    this.initElementRefs();
  }
}
