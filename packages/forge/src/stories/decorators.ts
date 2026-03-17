import { Decorator } from '@storybook/web-components-vite';
import { html } from 'lit';
import cssbeautify from 'cssbeautify';

export function storyStyles(styles: string): Decorator {
  // prettier-ignore
  return story => html`
      ${story()}

      <style>
${cssbeautify(styles, { indent: '  ' })}
      </style>
    `;
}
