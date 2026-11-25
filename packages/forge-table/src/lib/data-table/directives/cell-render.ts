import type { Cell } from '@tanstack/lit-table';
import { noChange } from 'lit';
import type { ElementPart, PartInfo } from 'lit/directive.js';
import { Directive, directive, PartType } from 'lit/directive.js';
import type { CellRenderController } from '../features/cell-render.js';
import type { DataTableFeatures } from '../table-features.js';

class QueueCellRenderDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error('queueCellRender can only be used on an element');
    }
  }

  public render(_controller: CellRenderController<any>, _cell: Cell<DataTableFeatures, any>): typeof noChange {
    return noChange;
  }

  public override update(part: ElementPart, [controller, cell]: [CellRenderController<any>, Cell<DataTableFeatures, any>]): typeof noChange {
    controller.queue(part.element as HTMLElement, cell);
    return noChange;
  }
}

export const queueCellRender = directive(QueueCellRenderDirective);
