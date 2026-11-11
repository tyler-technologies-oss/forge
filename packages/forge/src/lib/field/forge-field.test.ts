import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import forgeFieldStyles from './forge-field.scss?inline';

const READONLY_TEST_COLOR = 'rgb(1, 2, 3)';

describe('Field styles', () => {
  beforeAll(() => {
    const style = document.createElement('style');
    style.textContent = forgeFieldStyles;
    document.head.append(style);
  });

  afterEach(() => {
    document.querySelectorAll('.forge-field-test').forEach(element => element.remove());
  });

  it('should use the readonly colors when the input is readonly', async () => {
    const field = await createFixture({ readonly: true });
    field.style.setProperty('--forge-field-readonly-outline-color', READONLY_TEST_COLOR);
    field.style.setProperty('--forge-field-readonly-background', READONLY_TEST_COLOR);
    expect(getComputedStyle(field).outlineColor).toBe(READONLY_TEST_COLOR);
    expect(getComputedStyle(field).backgroundColor).toBe(READONLY_TEST_COLOR);
  });

  it('should use the readonly outline color when hovered', async () => {
    const field = await createFixture({ readonly: true });
    field.style.setProperty('--forge-field-readonly-outline-color', READONLY_TEST_COLOR);
    await userEvent.hover(field);
    expect(getComputedStyle(field).outlineColor).toBe(READONLY_TEST_COLOR);
  });

  it('should use the readonly background in the filled variant', async () => {
    const field = await createFixture({ readonly: true, modifier: 'filled' });
    field.style.setProperty('--forge-field-readonly-background', READONLY_TEST_COLOR);
    expect(getComputedStyle(field).backgroundColor).toBe(READONLY_TEST_COLOR);
  });

  it('should not use the readonly colors when the input is not readonly', async () => {
    const field = await createFixture();
    field.style.setProperty('--forge-field-readonly-outline-color', READONLY_TEST_COLOR);
    field.style.setProperty('--forge-field-readonly-background', READONLY_TEST_COLOR);
    expect(getComputedStyle(field).outlineColor).not.toBe(READONLY_TEST_COLOR);
    expect(getComputedStyle(field).backgroundColor).not.toBe(READONLY_TEST_COLOR);
  });

  it('should not use the readonly colors in the tonal variant', async () => {
    const field = await createFixture({ readonly: true, modifier: 'tonal' });
    field.style.setProperty('--forge-field-readonly-background', READONLY_TEST_COLOR);
    expect(getComputedStyle(field).backgroundColor).not.toBe(READONLY_TEST_COLOR);
  });

  for (const modifier of ['outlined', 'filled'] as const) {
    it(`should render the same as an editable field when no readonly colors are set in the ${modifier} variant`, async () => {
      const readonlyField = await createFixture({ readonly: true, modifier });
      const editableField = await createFixture({ modifier });
      expect(getComputedStyle(readonlyField).outlineColor).toBe(getComputedStyle(editableField).outlineColor);
      expect(getComputedStyle(readonlyField).backgroundColor).toBe(getComputedStyle(editableField).backgroundColor);
      await userEvent.hover(readonlyField);
      const readonlyHoverOutline = getComputedStyle(readonlyField).outlineColor;
      await userEvent.hover(editableField);
      expect(readonlyHoverOutline).toBe(getComputedStyle(editableField).outlineColor);
    });
  }
});

interface FieldFixtureConfig {
  readonly?: boolean;
  modifier?: 'outlined' | 'filled' | 'tonal';
}

async function createFixture({ readonly, modifier = 'outlined' }: FieldFixtureConfig = {}): Promise<HTMLElement> {
  const modifierClass = modifier === 'outlined' ? '' : `forge-field--${modifier}`;
  const screen = render(html`
    <div class="forge-field forge-field-test ${modifierClass}">
      <input aria-label="Test" ?readonly=${readonly} />
    </div>
  `);
  return screen.container.querySelector('.forge-field-test') as HTMLElement;
}
