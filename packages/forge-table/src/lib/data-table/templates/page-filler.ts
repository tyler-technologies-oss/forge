import { html, nothing, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Renders a blank, hidden row of the given height after the rows of a page that has fewer rows than the page size.
 */
export function renderPageFiller(colSpan: number, height: number): TemplateResult | typeof nothing {
  if (height <= 0) {
    return nothing;
  }

  return html`<tbody class="page-filler-tbody" part="page-filler" role="presentation" aria-hidden="true">
    <tr role="presentation" style=${styleMap({ height: `${height}px` })}>
      <td role="presentation" colspan=${colSpan}></td>
    </tr>
  </tbody>`;
}
