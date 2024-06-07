import { timer } from '@tylertech/forge-testing';

export function simulateHover(targetEl: HTMLElement, { pointerType = 'mouse', isPrimary = true } = {}): void {
  targetEl.dispatchEvent(new PointerEvent('pointerenter', { ...createMouseEventInit(targetEl), isPrimary, pointerType }));
}

export function simulateLeave(targetEl: HTMLElement): void {
  targetEl.dispatchEvent(new PointerEvent('pointerleave', createMouseEventInit(targetEl)));
}

export async function simulatePressed(targetEl: HTMLElement, { pointerType = 'mouse' }: PointerEventInit = {}): Promise<void> {
  const evtInit = {
    ...createMouseEventInit(targetEl),
    pointerType
  };
  targetEl.dispatchEvent(new PointerEvent('pointerenter', evtInit));
  await timer();
  targetEl.dispatchEvent(new PointerEvent('pointerdown', evtInit));
  targetEl.dispatchEvent(new PointerEvent('pointerup', evtInit));
  targetEl.dispatchEvent(new MouseEvent('click', evtInit));
}

export async function simulatePressAndHold(container: HTMLElement, { pointerType = 'mouse' }: PointerEventInit = {}): Promise<void> {
  const evtInit = {
    ...createMouseEventInit(container),
    pointerType
  };
  container.dispatchEvent(new PointerEvent('pointerenter', evtInit));
  await timer();
  container.dispatchEvent(new PointerEvent('pointerdown', evtInit));
}

export function createMouseEventInit(element: HTMLElement): PointerEventInit {
  const { top, right, left, bottom } = element.getBoundingClientRect();
  return {
    bubbles: true,
    cancelable: true,
    composed: true,
    clientX: (left + right) / 2,
    clientY: (top + bottom) / 2,
    screenX: (left + right) / 2,
    screenY: (top + bottom) / 2,
    isPrimary: true,
    pointerType: 'mouse',
    button: 0,
    buttons: 1
  };
}
