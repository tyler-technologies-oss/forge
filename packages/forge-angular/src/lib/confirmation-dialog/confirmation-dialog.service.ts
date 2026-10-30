import { Injectable } from '@angular/core';
import { IConfirmationDialogComponent, defineConfirmationDialogComponent } from '@tylertech/forge/confirmation-dialog';
import { ConfirmationDialogRef } from './confirmation-dialog-ref';

interface ConfirmationDialogServiceConfig extends Partial<IConfirmationDialogComponent> {
  title: string;
  message: string;
  secondaryButtonText: string;
  primaryButtonText: string;
}

/**
 * Provides facilities for showing a `<forge-confirmation-dialog>` element.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  static {
    defineConfirmationDialogComponent();
  }

  /**
   * Opens a confirmation dialog in a parent element (or the body if not provided).
   * @param config The confirmation dialog component configuration.
   * @param [parent] The parent element to attach this confirmation dialog instance to.
   */
  public open(
    { title, message, secondaryButtonText, primaryButtonText, ...config }: Partial<ConfirmationDialogServiceConfig>,
    parent = document.body
  ): ConfirmationDialogRef {
    const element = document.createElement('forge-confirmation-dialog');

    if (title) {
      this._createAndAppendSlottedElement(element, title, 'title');
    }
    if (message) {
      this._createAndAppendSlottedElement(element, message, 'message');
    }
    if (secondaryButtonText) {
      this._createAndAppendSlottedElement(element, secondaryButtonText, 'secondary-button-text');
    }
    if (primaryButtonText) {
      this._createAndAppendSlottedElement(element, primaryButtonText, 'primary-button-text');
    }

    Object.assign(element, config);
    parent.appendChild(element);

    element.open = true;
    return new ConfirmationDialogRef(element);
  }

  private _createAndAppendSlottedElement(dialog: IConfirmationDialogComponent, slotContent: string, slotName: string): void {
    const span = document.createElement('span');
    span.innerText = slotContent;
    span.slot = slotName;
    dialog.appendChild(span);
  }
}
