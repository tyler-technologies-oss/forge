import { afterEach, describe, expect, it } from 'vitest';
import { playClassAnimation } from './animation-utils.js';
import { frame } from './utils.js';

const ANIMATION_DURATION = 100;
const CLASS_NAME = 'animate';

describe('playClassAnimation', () => {
  let style: HTMLStyleElement;
  let element: HTMLElement;

  const setup = (css = `.${CLASS_NAME} { animation: test-fade ${ANIMATION_DURATION}ms linear; }`): void => {
    style = document.createElement('style');
    style.textContent = `@keyframes test-fade { to { opacity: 0; } } ${css}`;
    document.head.append(style);
    element = document.createElement('div');
    element.innerHTML = '<span></span>';
    document.body.append(element);
  };

  afterEach(() => {
    style?.remove();
    element?.remove();
  });

  it('should resolve true and remove the class when the animation finishes', async () => {
    setup();

    const finished = await playClassAnimation(element, CLASS_NAME);

    expect(finished).toBe(true);
    expect(element.classList.contains(CLASS_NAME)).toBe(false);
  });

  it('should keep the class when remove is false', async () => {
    setup();

    const finished = await playClassAnimation(element, CLASS_NAME, { remove: false });

    expect(finished).toBe(true);
    expect(element.classList.contains(CLASS_NAME)).toBe(true);
  });

  it('should resolve true right away when the class starts no animation', async () => {
    setup('');

    const finished = await playClassAnimation(element, CLASS_NAME);

    expect(finished).toBe(true);
  });

  it('should resolve false when the class is removed before the animation finishes', async () => {
    setup();

    const result = playClassAnimation(element, CLASS_NAME);
    await frame();
    element.classList.remove(CLASS_NAME);

    expect(await result).toBe(false);
  });

  it('should not finish early when a descendant animation ends', async () => {
    setup(`.${CLASS_NAME} { animation: test-fade ${ANIMATION_DURATION * 3}ms linear; } .${CLASS_NAME} span { animation: test-fade 1ms linear; }`);
    let settled = false;

    const result = playClassAnimation(element, CLASS_NAME).then(() => (settled = true));
    await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION));

    expect(settled).toBe(false);
    await result;
    expect(settled).toBe(true);
  });
});
