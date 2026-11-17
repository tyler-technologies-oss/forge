import { cdp } from 'vitest/browser';

const MOVEMENT_PROPERTIES = ['transform', 'translate', 'scale', 'rotate', 'height', 'width', 'grid-template-rows', 'grid-template-columns'];

/**
 * Turns the `prefers-reduced-motion: reduce` media query on or off in the test browser, so styles and scripts
 * see the real preference. Chromium only. Always turn it off again, for example in `afterEach`.
 */
export async function emulateReducedMotion(reduce: boolean): Promise<void> {
  await cdp().send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : '' }] });
}

/**
 * Returns the running animations and transitions in a shadow root that move, resize or scale something,
 * as opposed to ones that only change opacity or color.
 */
export function getMovementAnimations(root: ShadowRoot | Document): Animation[] {
  return root.getAnimations().filter(animation => {
    if (animation instanceof CSSTransition) {
      return MOVEMENT_PROPERTIES.includes(animation.transitionProperty);
    }
    const keyframes = (animation.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
    return keyframes.some(keyframe =>
      Object.entries(keyframe).some(([property, value]) => {
        const cssProperty = property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        return MOVEMENT_PROPERTIES.includes(cssProperty) && value !== 'none' && !/^(translate[XY]?\(0(px)?\)\s*)+$/.test(String(value).trim());
      })
    );
  });
}
