import { Decorator } from '@storybook/web-components';
import { html } from 'lit';
import cssbeautify from 'cssbeautify';

export function storyStyles(styles: string): Decorator {
  // prettier-ignore
  return story => {
    return html`
      ${story()}

      <style>
${cssbeautify(styles, { indent: '  ' })}
      </style>
    `;
  };
}
