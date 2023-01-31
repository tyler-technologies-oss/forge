export function showToast(message: string): void {
  const toastEl = document.createElement('forge-toast');
  toastEl.message = message;
  document.body.appendChild(toastEl);
}

export function randomTimeout(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
