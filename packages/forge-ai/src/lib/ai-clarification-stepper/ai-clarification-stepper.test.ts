import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import type { AiClarificationQuestion, AiClarificationStepperComponent, AiClarificationStepperSubmitEventData } from './ai-clarification-stepper.js';

import './ai-clarification-stepper.js';

// The first question lists its recommended option second so ordering is observable. It renders as:
// Status date (recommended), Report date, Something else, Choose recommended for all.
const questions: AiClarificationQuestion[] = [
  {
    id: 'field',
    question: 'Which date field?',
    options: [
      { label: 'Report date', value: 'report_date' },
      { label: 'Status date', value: 'status_date', recommended: true }
    ]
  },
  {
    id: 'window',
    question: 'What does last quarter mean?',
    options: [
      { label: 'Calendar quarter', value: 'calendar', recommended: true },
      { label: 'Trailing three months', value: 'trailing' }
    ],
    allowCustom: false
  }
];

const REPORT_DATE = 1;
const SOMETHING_ELSE = 2;
const AUTO = 3;

async function createStepper(items: AiClarificationQuestion[] = questions): Promise<AiClarificationStepperComponent> {
  return renderFixture<AiClarificationStepperComponent>(
    html`<forge-ai-clarification-stepper .questions=${items}></forge-ai-clarification-stepper>`,
    'forge-ai-clarification-stepper'
  );
}

function oneEvent(el: HTMLElement, eventName: string): Promise<CustomEvent<AiClarificationStepperSubmitEventData>> {
  return new Promise(resolve =>
    el.addEventListener(eventName, evt => resolve(evt as CustomEvent<AiClarificationStepperSubmitEventData>), {
      once: true
    })
  );
}

function query<T extends HTMLElement>(el: AiClarificationStepperComponent, selector: string): T {
  return el.shadowRoot!.querySelector<T>(selector)!;
}

function radios(el: AiClarificationStepperComponent): HTMLInputElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
}

function checked(el: AiClarificationStepperComponent): boolean[] {
  return radios(el).map(radio => radio.checked);
}

async function click(el: AiClarificationStepperComponent, selector: string): Promise<void> {
  query(el, selector).click();
  await el.updateComplete;
}

async function choose(el: AiClarificationStepperComponent, index: number): Promise<void> {
  radios(el)[index].click();
  await el.updateComplete;
}

async function type(el: AiClarificationStepperComponent, text: string): Promise<void> {
  const input = query<HTMLInputElement>(el, '.custom-input');
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
}

function pressEnter(el: AiClarificationStepperComponent): void {
  query(el, '.custom-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
}

describe('AiClarificationStepper', () => {
  it('should contain shadow root', async () => {
    const el = await createStepper();

    expect(el.shadowRoot).toBeTruthy();
  });

  it('should render nothing without questions', async () => {
    const el = await createStepper([]);

    expect(query(el, '.stepper')).toBeNull();
  });

  it('should show the question with the step counter to its right and no progress trail', async () => {
    const el = await createStepper();
    const header = query(el, '.header');

    expect(Array.from(header.children).map(child => child.className)).toEqual(['question', 'counter']);
    expect(query(el, '.counter').textContent).toBe('Step 1 of 2');
    expect(query(el, '.question').textContent).toBe('Which date field?');
    expect(query(el, '.progress')).toBeNull();
  });

  it('should render the recommended option first and preselect it', async () => {
    const el = await createStepper();
    const labels = Array.from(el.shadowRoot!.querySelectorAll('.option-label')).map(label => label.textContent);

    expect(labels.slice(0, 2)).toEqual(['Status date', 'Report date']);
    expect(checked(el)).toEqual([true, false, false, false]);
    expect(query(el, '.option-recommended').textContent).toBe('· Recommended');
  });

  it('should group options as a labelled radio group sharing one name', async () => {
    const el = await createStepper();
    const group = query(el, '[role="radiogroup"]');

    expect(group.getAttribute('aria-labelledby')).toBe(query(el, '.question').id);
    expect(new Set(radios(el).map(radio => radio.name)).size).toBe(1);
  });

  describe('numbered markers', () => {
    function indexes(el: AiClarificationStepperComponent): string[] {
      return Array.from(el.shadowRoot!.querySelectorAll('.option-index')).map(marker => marker.textContent!.trim());
    }

    it('should number every option in display order, including "Something else" and the auto option', async () => {
      const el = await createStepper();

      expect(indexes(el)).toEqual(['1', '2', '3', '4']);
    });

    it('should number past a closed question that has no "Something else"', async () => {
      const el = await createStepper([questions[1]]);

      expect(indexes(el)).toEqual(['1', '2', '3']);
    });

    it('should hide the numbers from assistive technology and keep the radio inside the marker', async () => {
      const el = await createStepper();

      for (const marker of Array.from(el.shadowRoot!.querySelectorAll('.option-marker'))) {
        expect(marker.querySelector('.option-index')!.getAttribute('aria-hidden')).toBe('true');
        expect(marker.querySelector('input[type="radio"]')).toBeTruthy();
      }
    });

    it('should fill the chosen marker and leave the others outlined', async () => {
      const el = await createStepper();
      const markers = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option-index'));
      const fill = (marker: HTMLElement): string => getComputedStyle(marker).backgroundColor;

      // The recommended option is preselected, so only the first marker is filled.
      const filled = fill(markers[0]);
      const outlined = fill(markers[1]);
      expect(filled).not.toBe(outlined);
      expect(fill(markers[2])).toBe(outlined);

      await choose(el, REPORT_DATE);
      // The marker fades its fill like a `forge-step`, so read the colors once the transitions have settled.
      await Promise.all(markers.flatMap(marker => marker.getAnimations().map(animation => animation.finished)));

      expect(fill(markers[1])).toBe(filled);
      expect(fill(markers[0])).toBe(outlined);
      expect(fill(markers[2])).toBe(outlined);
    });
  });

  describe('option styling', () => {
    it('should draw no border on any option, chosen or not', async () => {
      const el = await createStepper();
      await choose(el, REPORT_DATE);

      for (const option of Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option'))) {
        const style = getComputedStyle(option);
        expect(style.borderTopWidth, 'border').toBe('0px');
        expect(style.outlineStyle, 'outline').toBe('none');
      }
    });

    it('should tint the chosen option instead', async () => {
      const el = await createStepper();
      const options = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option'));
      const tint = (option: HTMLElement): string => getComputedStyle(option).backgroundColor;

      expect(tint(options[0])).not.toBe(tint(options[1]));
      expect(tint(options[1])).toBe(tint(options[2]));
    });

    it('should render the number as a square with the medium shape radius', async () => {
      const el = await createStepper();

      for (const marker of Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option-index'))) {
        expect(getComputedStyle(marker).borderTopLeftRadius).toBe('4px');
      }
    });

    it('should set Forge dividers above and below "Choose recommended for all"', async () => {
      const el = await createStepper();
      const auto = query(el, '.option--auto');

      expect(auto.previousElementSibling!.matches('hr.forge-divider')).toBe(true);
      expect(auto.nextElementSibling!.matches('hr.forge-divider')).toBe(true);
      expect(el.shadowRoot!.querySelectorAll('hr')).toHaveLength(2);
    });

    it("should not set dividers around the current step's recommended option", async () => {
      const el = await createStepper();
      const recommended = query(el, '.option-recommended').closest('.option')!;

      expect(recommended.previousElementSibling).toBeNull();
      expect(recommended.nextElementSibling!.matches('.option')).toBe(true);
    });

    it('should leave every option row clear until it is chosen', async () => {
      const el = await createStepper();
      const options = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option'));

      // The first option is the preselected recommended one, so it is the only chosen row.
      for (const option of options.slice(1)) {
        expect(getComputedStyle(option).backgroundColor).toBe('rgba(0, 0, 0, 0)');
      }
    });

    it('should put the resting fill on the number squares, and not on the chosen one', async () => {
      const el = await createStepper();
      const markers = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option-index'));
      await Promise.all(markers.flatMap(marker => marker.getAnimations().map(animation => animation.finished)));

      expect(getComputedStyle(markers[0]).backgroundColor).toBe('rgb(181, 192, 255)');
      for (const marker of markers.slice(1)) {
        expect(getComputedStyle(marker).backgroundColor).toBe('rgba(0, 0, 51, 0.06)');
      }
    });

    it('should fill the pencil square with the chosen fill, not the resting one', async () => {
      const el = await createStepper();

      await choose(el, SOMETHING_ELSE);
      const pencil = query(el, '.option--custom .option-index');
      await Promise.all(pencil.getAnimations().map(animation => animation.finished));

      expect(pencil.querySelector('svg')).toBeTruthy();
      expect(getComputedStyle(pencil).backgroundColor).toBe('rgb(181, 192, 255)');
    });

    it('should fill the chosen option, including "Choose recommended for all", with the light tertiary container color', async () => {
      const el = await createStepper();
      const fill = (selector: string): string => getComputedStyle(query(el, selector)).backgroundColor;

      expect(getComputedStyle(el.shadowRoot!.querySelectorAll<HTMLElement>('.option')[0]).backgroundColor).toBe('rgb(232, 235, 255)');

      await choose(el, AUTO);

      expect(fill('.option--auto')).toBe('rgb(232, 235, 255)');
    });

    it('should fill the chosen number with the tertiary container color and draw no outline on any number', async () => {
      const el = await createStepper();
      const markers = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option-index'));
      await Promise.all(markers.flatMap(marker => marker.getAnimations().map(animation => animation.finished)));

      expect(getComputedStyle(markers[0]).backgroundColor).toBe('rgb(181, 192, 255)');
      for (const marker of markers) {
        expect(getComputedStyle(marker).borderTopColor).toBe('rgba(0, 0, 0, 0)');
      }
    });

    it('should color the "Something else" text like the other option labels', async () => {
      const el = await createStepper();
      const label = getComputedStyle(query(el, '.option-label')).color;
      const placeholder = getComputedStyle(query(el, '.custom-input'), '::placeholder');

      expect(placeholder.color).toBe(label);
      expect(placeholder.opacity).toBe('1');
    });

    it('should give the "Auto" badge the grey surface container color', async () => {
      const el = await createStepper();

      expect(getComputedStyle(query(el, '.auto-badge')).backgroundColor).toBe('rgb(235, 235, 235)');
    });

    it('should hide the dividers from assistive technology', async () => {
      const el = await createStepper();

      for (const divider of Array.from(el.shadowRoot!.querySelectorAll('hr'))) {
        expect(divider.getAttribute('aria-hidden')).toBe('true');
      }
    });

    it('should render no dividers when no option is recommended', async () => {
      const el = await createStepper([
        {
          id: 'only',
          question: 'Pick one',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' }
          ]
        }
      ]);

      expect(el.shadowRoot!.querySelectorAll('hr')).toHaveLength(0);
    });
  });

  describe('Forge variants', () => {
    it('should render "Back" as a plain text button with no outline', async () => {
      const el = await createStepper();
      await click(el, '.next-button');
      const back = query<HTMLButtonElement>(el, '.back-button');

      expect(back.classList.contains('forge-button')).toBe(true);
      expect(back.classList.contains('forge-button--outlined')).toBe(false);
      expect(getComputedStyle(back).borderTopWidth).toBe('0px');
    });

    it('should render "Next" as a tonal button', async () => {
      const el = await createStepper();
      const next = query(el, '.next-button');

      expect(next.classList.contains('forge-button--tonal')).toBe(true);
      expect(next.classList.contains('forge-button--filled')).toBe(false);
    });

    it('should build the "Something else" input from the plain Forge field', async () => {
      const el = await createStepper();
      const field = query(el, '.custom-field');
      const input = query<HTMLInputElement>(el, '.custom-input');

      expect(field.classList.contains('forge-field')).toBe(true);
      expect(field.classList.contains('forge-field--plain')).toBe(true);
      expect(field.contains(input)).toBe(true);
      expect(getComputedStyle(input).borderTopWidth).toBe('0px');
      expect(getComputedStyle(input).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    });

    it('should keep the "Something else" row as tall as the other rows', async () => {
      const el = await createStepper();
      const options = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option'));
      const height = (option: HTMLElement): number => option.getBoundingClientRect().height;

      for (const option of options) {
        expect(height(option), option.className).toBe(height(options[0]));
      }
    });

    it('should draw no focus ring around the field while typing', async () => {
      const el = await createStepper();

      query<HTMLInputElement>(el, '.custom-input').focus();
      await el.updateComplete;

      const field = query(el, '.custom-field');
      await Promise.all(field.getAnimations({ subtree: true }).map(animation => animation.finished));

      expect(getComputedStyle(field, '::after').outlineWidth).toBe('0px');
      expect(getComputedStyle(field).outlineStyle).toBe('none');
    });
  });

  it('should show no "Back" on the first step', async () => {
    const el = await createStepper();

    expect(query(el, '.back-button')).toBeNull();
  });

  it('should advance with "Next" and show "Back" before it', async () => {
    const el = await createStepper();

    await click(el, '.next-button');

    expect(query(el, '.counter').textContent).toBe('Step 2 of 2');
    const actions = Array.from(query(el, '.actions').children);
    expect(actions.map(child => child.className.split(' ')[0])).toEqual(['back-button', 'next-button']);
  });

  it('should go back to the previous step', async () => {
    const el = await createStepper();

    await click(el, '.next-button');
    await click(el, '.back-button');

    expect(query(el, '.counter').textContent).toBe('Step 1 of 2');
    expect(query(el, '.back-button')).toBeNull();
  });

  it('should move focus to the question when the step changes', async () => {
    const el = await createStepper();

    await click(el, '.next-button');

    expect(el.shadowRoot!.activeElement).toBe(query(el, '.question'));
  });

  it('should label the forward action "Run" on the last step', async () => {
    const el = await createStepper();

    expect(query(el, '.next-button').textContent!.trim()).toBe('Next');
    await click(el, '.next-button');

    expect(query(el, '.next-button').textContent!.trim()).toBe('Run');
  });

  it('should restore the earlier answer when going back', async () => {
    const el = await createStepper();

    await choose(el, REPORT_DATE);
    await click(el, '.next-button');
    await click(el, '.back-button');

    expect(checked(el)).toEqual([false, true, false, false]);
  });

  it('should render "Something else" as an editable text field by default and omit it when allowCustom is false', async () => {
    const el = await createStepper();

    expect(query<HTMLInputElement>(el, '.custom-input').placeholder).toBe('Something else');
    await click(el, '.next-button');
    expect(query(el, '.custom-input')).toBeNull();
  });

  it('should select "Something else" when its text field is focused', async () => {
    const el = await createStepper();

    query<HTMLInputElement>(el, '.custom-input').focus();
    await el.updateComplete;

    expect(checked(el)[SOMETHING_ELSE]).toBe(true);
  });

  it('should select "Something else" when text is typed in its field', async () => {
    const el = await createStepper();

    await type(el, 'Assignment date');

    expect(checked(el)).toEqual([false, false, true, false]);
    expect(query<HTMLInputElement>(el, '.custom-input').value).toBe('Assignment date');
  });

  it('should label the text field with the question', async () => {
    const el = await createStepper();

    expect(query<HTMLInputElement>(el, '.custom-input').getAttribute('aria-label')).toContain('Which date field?');
    expect(radios(el)[SOMETHING_ELSE].getAttribute('aria-label')).toBe('Something else');
  });

  it('should move focus into the text field on a pointer click of its radio', async () => {
    const el = await createStepper();

    radios(el)[SOMETHING_ELSE].dispatchEvent(new MouseEvent('click', { detail: 1, bubbles: true, composed: true }));
    await el.updateComplete;

    expect(el.shadowRoot!.activeElement).toBe(query(el, '.custom-input'));
  });

  it('should leave focus on the radio when "Something else" is chosen from the keyboard', async () => {
    const el = await createStepper();

    radios(el)[SOMETHING_ELSE].focus();
    await choose(el, SOMETHING_ELSE);

    expect(checked(el)[SOMETHING_ELSE]).toBe(true);
    expect(el.shadowRoot!.activeElement).toBe(radios(el)[SOMETHING_ELSE]);
  });

  it('should show no helper text beneath "Something else" while it is being edited', async () => {
    const el = await createStepper();

    await choose(el, SOMETHING_ELSE);
    await type(el, 'Assignment date');

    const options = el.shadowRoot!.querySelector('.options')!;
    expect(options.querySelector('p')).toBeNull();
    expect(query(el, '.option--custom').nextElementSibling!.matches('hr.forge-divider')).toBe(true);
  });

  it('should disable "Next" until the custom answer has text', async () => {
    const el = await createStepper();

    await choose(el, SOMETHING_ELSE);
    expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(true);

    await type(el, '   ');
    expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(true);

    await type(el, 'Assignment date');
    expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(false);
  });

  it('should advance on Enter in the text field without submitting', async () => {
    const el = await createStepper();
    let submitted = false;
    el.addEventListener('forge-ai-clarification-stepper-submit', () => (submitted = true));

    await type(el, 'Assignment date');
    pressEnter(el);
    await el.updateComplete;

    expect(query(el, '.counter').textContent).toBe('Step 2 of 2');
    expect(submitted).toBe(false);
  });

  it('should ignore Enter while the field is empty and ignore other keys', async () => {
    const el = await createStepper();

    await choose(el, SOMETHING_ELSE);
    pressEnter(el);
    query(el, '.custom-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true }));
    await el.updateComplete;

    expect(query(el, '.counter').textContent).toBe('Step 1 of 2');
  });

  it('should ignore Enter on the last step', async () => {
    const el = await createStepper([questions[0]]);
    let submitted = false;
    el.addEventListener('forge-ai-clarification-stepper-submit', () => (submitted = true));

    await type(el, 'Assignment date');
    pressEnter(el);
    await el.updateComplete;

    expect(submitted).toBe(false);
  });

  it('should restore typed custom text when going back', async () => {
    const el = await createStepper();

    await type(el, 'Assignment date');
    await click(el, '.next-button');
    await click(el, '.back-button');

    expect(query<HTMLInputElement>(el, '.custom-input').value).toBe('Assignment date');
    expect(checked(el)[SOMETHING_ELSE]).toBe(true);
  });

  describe('pencil icon', () => {
    const marker = (el: AiClarificationStepperComponent): HTMLElement => query(el, '.option--custom .option-index');

    it('should show the number on "Something else" while it is not chosen', async () => {
      const el = await createStepper();

      expect(marker(el).textContent!.trim()).toBe('3');
      expect(marker(el).querySelector('svg')).toBeNull();
    });

    it('should replace the number with a decorative pencil once "Something else" is chosen', async () => {
      const el = await createStepper();

      await choose(el, SOMETHING_ELSE);

      expect(marker(el).textContent!.trim()).toBe('');
      expect(marker(el).querySelector('svg.forge-icon path')!.getAttribute('d')).toMatch(/^m14\.06 9/);
      expect(marker(el).getAttribute('aria-hidden')).toBe('true');
    });

    it('should bring the number back when another option is chosen', async () => {
      const el = await createStepper();

      await choose(el, SOMETHING_ELSE);
      await choose(el, REPORT_DATE);
      expect(marker(el).textContent!.trim()).toBe('3');

      await choose(el, SOMETHING_ELSE);
      await choose(el, AUTO);
      expect(marker(el).textContent!.trim()).toBe('3');
    });

    it('should show the pencil when the text field is focused', async () => {
      const el = await createStepper();

      query<HTMLInputElement>(el, '.custom-input').focus();
      await el.updateComplete;

      expect(marker(el).querySelector('svg')).toBeTruthy();
    });
  });

  describe('summary', () => {
    const summary = (el: AiClarificationStepperComponent): string | undefined => el.shadowRoot!.querySelector('.summary')?.textContent ?? undefined;

    const grouping: AiClarificationQuestion = {
      id: 'group',
      question: 'How should results be grouped?',
      options: [
        { label: 'Beat', value: 'beat', recommended: true },
        { label: 'District', value: 'district' }
      ]
    };

    it('should show nothing on the first step', async () => {
      const el = await createStepper();

      expect(summary(el)).toBeUndefined();
    });

    it('should show nothing for a single question', async () => {
      const el = await createStepper([questions[1]]);

      expect(summary(el)).toBeUndefined();
    });

    it("should list the previous step's answer above the buttons, without the current selection", async () => {
      const el = await createStepper();

      await click(el, '.next-button');

      expect(summary(el)).toBe('Status date');
      expect(summary(el)).not.toContain('Calendar quarter');
      expect(query(el, '.summary').nextElementSibling).toBe(query(el, '.actions'));
    });

    it('should separate several previous answers with a bullet, in step order', async () => {
      const el = await createStepper([...questions, grouping]);

      await click(el, '.next-button');
      await click(el, '.next-button');

      expect(summary(el)).toBe('Status date • Calendar quarter');
    });

    it('should show the choices made in earlier steps, including a typed one', async () => {
      const el = await createStepper([...questions, grouping]);

      await choose(el, REPORT_DATE);
      await click(el, '.next-button');
      expect(summary(el)).toBe('Report date');

      await click(el, '.back-button');
      await type(el, 'Assignment date');
      await click(el, '.next-button');
      expect(summary(el)).toBe('Assignment date');
    });

    it("should not change as the current step's selection changes", async () => {
      const el = await createStepper();

      await click(el, '.next-button');
      await choose(el, 1);

      expect(summary(el)).toBe('Status date');
    });

    it('should keep showing the earlier picks, not the recommended ones, when "Choose recommended for all" is chosen', async () => {
      const el = await createStepper([...questions, grouping]);

      await choose(el, REPORT_DATE);
      await click(el, '.next-button');
      await choose(el, radios(el).length - 1);

      expect(summary(el)).toBe('Report date');
    });

    it('should be styled like the step counter', async () => {
      const el = await createStepper();
      await click(el, '.next-button');
      const counter = getComputedStyle(query(el, '.counter'));
      const label = getComputedStyle(query(el, '.summary'));

      expect(label.fontSize).toBe(counter.fontSize);
      expect(label.fontWeight).toBe(counter.fontWeight);
      expect(label.color).toBe(counter.color);
    });
  });

  it('should submit every chosen answer from the last step', async () => {
    const el = await createStepper();

    await type(el, 'Assignment date');
    await click(el, '.next-button');

    const submitted = oneEvent(el, 'forge-ai-clarification-stepper-submit');
    query(el, '.next-button').click();
    const { detail } = await submitted;

    expect(detail.answers).toEqual([
      { questionId: 'field', value: 'Assignment date', label: 'Assignment date', custom: true },
      { questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }
    ]);
  });

  describe('choose recommended for all', () => {
    it('should be the last option, with an "Auto" badge', async () => {
      const el = await createStepper();
      const options = el.shadowRoot!.querySelectorAll('.option');

      expect(options[options.length - 1]).toBe(query(el, '.option--auto'));
      expect(query(el, '.option--auto .option-label').textContent).toBe('Choose recommended for all');
      expect(query(el, '.auto-badge').textContent).toBe('Auto');
    });

    it('should be the last option even when the question has no "Something else"', async () => {
      const el = await createStepper([questions[1]]);
      const radioInputs = radios(el);

      expect(radioInputs).toHaveLength(3);
      expect(radioInputs[2].closest('.option')).toBe(query(el, '.option--auto'));
    });

    it('should be omitted when no question has a recommended option', async () => {
      const el = await createStepper([
        {
          id: 'only',
          question: 'Pick one',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' }
          ]
        }
      ]);

      expect(query(el, '.option--auto')).toBeNull();
    });

    it('should uncheck the other options and relabel the forward action "Run" when chosen', async () => {
      const el = await createStepper();

      await choose(el, AUTO);

      expect(checked(el)).toEqual([false, false, false, true]);
      expect(query(el, '.next-button').textContent!.trim()).toBe('Run');
    });

    it('should submit every recommended answer straight from the first step', async () => {
      const el = await createStepper();

      await choose(el, REPORT_DATE);
      await choose(el, AUTO);
      const submitted = oneEvent(el, 'forge-ai-clarification-stepper-submit');
      query(el, '.next-button').click();
      const { detail } = await submitted;

      expect(detail.answers).toEqual([
        { questionId: 'field', value: 'status_date', label: 'Status date', custom: false },
        { questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }
      ]);
    });

    it('should enable the forward action even when "Something else" was left empty', async () => {
      const el = await createStepper();

      await choose(el, SOMETHING_ELSE);
      expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(true);

      await choose(el, AUTO);
      expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(false);
    });

    it('should fall back to the first option for a question that has no recommended option', async () => {
      const el = await createStepper([
        questions[0],
        {
          id: 'unranked',
          question: 'Pick one',
          options: [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' }
          ]
        }
      ]);

      await choose(el, AUTO);
      const submitted = oneEvent(el, 'forge-ai-clarification-stepper-submit');
      query(el, '.next-button').click();
      const { detail } = await submitted;

      expect(detail.answers.map((answer: { value: string }) => answer.value)).toEqual(['status_date', 'a']);
    });

    it('should be cleared when another option is chosen', async () => {
      const el = await createStepper();

      await choose(el, AUTO);
      await choose(el, REPORT_DATE);

      expect(checked(el)).toEqual([false, true, false, false]);
      expect(query(el, '.next-button').textContent!.trim()).toBe('Next');
    });

    it('should be cleared when the text field is focused', async () => {
      const el = await createStepper();

      await choose(el, AUTO);
      query<HTMLInputElement>(el, '.custom-input').focus();
      await el.updateComplete;

      expect(checked(el)).toEqual([false, false, true, false]);
    });
  });

  it('should preselect the first option when none is recommended', async () => {
    const el = await createStepper([
      {
        id: 'only',
        question: 'Pick one',
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' }
        ]
      }
    ]);

    expect(radios(el)[0].checked).toBe(true);
    const submitted = oneEvent(el, 'forge-ai-clarification-stepper-submit');
    query(el, '.next-button').click();
    const { detail } = await submitted;

    expect(detail.answers[0].value).toBe('a');
  });

  describe('status', () => {
    const submitted = [
      { questionId: 'field', value: 'status_date', label: 'Status date', custom: false },
      { questionId: 'window', value: 'calendar', label: 'Calendar quarter', custom: false }
    ];

    async function setStatus(el: AiClarificationStepperComponent, status: AiClarificationStepperComponent['status']): Promise<void> {
      el.status = status;
      await el.updateComplete;
    }

    it('should be editing by default and reflect its status to an attribute', async () => {
      const el = await createStepper();

      expect(el.status).toBe('editing');
      expect(el.getAttribute('status')).toBe('editing');
    });

    it('should disable every control while sending', async () => {
      const el = await createStepper();
      await click(el, '.next-button');
      await choose(el, SOMETHING_ELSE - 1);

      await setStatus(el, 'sending');

      const controls = Array.from(el.shadowRoot!.querySelectorAll<HTMLInputElement | HTMLButtonElement>('input, button'));
      expect(controls.length).toBeGreaterThan(0);
      for (const control of controls) {
        expect(control.disabled, control.className || control.type).toBe(true);
      }
    });

    it('should keep the chosen answers visible while sending', async () => {
      const el = await createStepper();
      await choose(el, REPORT_DATE);

      await setStatus(el, 'sending');

      expect(checked(el)).toEqual([false, true, false, false]);
    });

    it('should neither advance nor submit while sending', async () => {
      const el = await createStepper();
      let sent = false;
      el.addEventListener('forge-ai-clarification-stepper-submit', () => (sent = true));
      await type(el, 'Assignment date');

      await setStatus(el, 'sending');
      pressEnter(el);
      await el.updateComplete;

      expect(query(el, '.counter').textContent).toBe('Step 1 of 2');
      expect(sent).toBe(false);
    });

    it('should enable the controls again when it returns to editing', async () => {
      const el = await createStepper();

      await setStatus(el, 'sending');
      await setStatus(el, 'editing');

      expect(radios(el).every(radio => !radio.disabled)).toBe(true);
      expect(query<HTMLButtonElement>(el, '.next-button').disabled).toBe(false);
    });

    it('should show only a record of the answers, against their questions, once sent', async () => {
      const el = await createStepper();

      el.answers = submitted;
      await setStatus(el, 'sent');

      expect(Array.from(el.shadowRoot!.querySelectorAll('.record-question')).map(node => node.textContent)).toEqual([
        'Which date field?',
        'What does last quarter mean?'
      ]);
      expect(Array.from(el.shadowRoot!.querySelectorAll('.record-answer')).map(node => node.textContent)).toEqual(['Status date', 'Calendar quarter']);
      expect(el.shadowRoot!.querySelectorAll('input, button')).toHaveLength(0);
      expect(query(el, '.counter')).toBeNull();
    });

    it('should still show an answer whose question is not known', async () => {
      const el = await createStepper();

      el.answers = [{ questionId: 'gone', value: 'x', label: 'Orphaned answer', custom: false }];
      await setStatus(el, 'sent');

      expect(query(el, '.record-answer').textContent).toBe('Orphaned answer');
      expect(query(el, '.record-question')).toBeNull();
    });

    it('should render nothing once sent with no answers', async () => {
      const el = await createStepper();

      await setStatus(el, 'sent');

      expect(query(el, '.stepper')).toBeNull();
    });
  });

  it('should reset to the first step when the questions change', async () => {
    const el = await createStepper();

    await click(el, '.next-button');
    el.questions = [...questions];
    await el.updateComplete;

    expect(query(el, '.counter').textContent).toBe('Step 1 of 2');
  });
});
