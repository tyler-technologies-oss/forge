import { TestBed } from '@angular/core/testing';
import { ConfirmationDialogService } from './confirmation-dialog.service';

describe('ConfirmationDialogService', () => {
  let service: ConfirmationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationDialogService);
  });

  it('should open a confirmation dialog with slotted title and message', () => {
    const dialogRef = service.open({ title: 'Delete item', message: 'Are you sure?' });

    expect(dialogRef.nativeElement.tagName.toLowerCase()).toBe('forge-confirmation-dialog');
    expect(dialogRef.nativeElement.open).toBe(true);
    expect(dialogRef.nativeElement.querySelector('[slot="title"]')?.textContent).toBe('Delete item');
    expect(dialogRef.nativeElement.querySelector('[slot="message"]')?.textContent).toBe('Are you sure?');

    dialogRef.close();
  });

  it('should emit onAction when an action button is clicked', () => {
    const dialogRef = service.open({ title: 'Delete item', message: 'Are you sure?' });
    const actionSpy = vi.fn();
    dialogRef.onAction.subscribe(actionSpy);

    dialogRef.nativeElement.dispatchEvent(new CustomEvent('forge-confirmation-dialog-action', { detail: { value: true, reason: 'action' } }));

    expect(actionSpy).toHaveBeenCalledOnce();

    dialogRef.close();
  });
});
