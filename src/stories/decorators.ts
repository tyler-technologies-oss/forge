import { Decorator } from '@storybook/web-components';
import { html } from 'lit';

export function storyStyles(styles: string): Decorator {
  return story => {
    return html`
      ${story()}

      <style>
        ${styles}
      </style>
    `;
  };
}
