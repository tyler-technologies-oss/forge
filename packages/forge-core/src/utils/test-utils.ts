export function tick(): Promise<void> {
  return new Promise<void>(resolve => {
    requestAnimationFrame(() => resolve());
  });
}

export function timer(duration = 0): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), duration);
  });
}
