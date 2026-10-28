import type { Cell } from '@tanstack/lit-table';
import { noChange } from 'lit';
import { Directive, directive } from 'lit/directive.js';

class LightDomRenderDirective extends Directive {
  public render(host: HTMLElement, cell: Cell<any, any>): typeof noChange {
    const slotName = `col-${cell.column.id}:row-${cell.row.id}`;

    const container = host.querySelector(`[slot="${slotName}"]`) ?? document.createElement('div');
    container.slot = slotName;
    container.setAttribute('data-custom-cell', '');

    const comp = cell.column.columnDef.cell;
    let template;
    if (typeof comp === 'function') {
      template = comp(cell.getContext());
    } else {
      template = cell.renderValue();
    }

    if (!template) {
      container.remove();
      return noChange;
    }

    if (template === container.firstChild) {
      return noChange;
    }

    if (template instanceof HTMLElement) {
      if (container.childNodes.length) {
        container.childNodes.forEach(node => node.remove());
      }
      container.appendChild(template);
    } else {
      container.innerHTML = template;
    }

    if (!container.isConnected) {
      host.appendChild(container);
    }

    return noChange;
  }
}

export const lightDomRender = directive(LightDomRenderDirective);
