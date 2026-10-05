import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

@Component({
  selector: 'lib-test-dialog-content',
  template: '<span>dialog content</span>',
  standalone: true
})
class TestDialogContentComponent {}

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should open a dialog and attach the given component', () => {
    const dialogRef = service.open(TestDialogContentComponent);

    expect(dialogRef.nativeElement.tagName.toLowerCase()).toBe('forge-dialog');
    expect(document.body.contains(dialogRef.nativeElement)).toBe(true);

    dialogRef.close();
  });

  it('should notify subscribers when the dialog closes', () => {
    const dialogRef = service.open(TestDialogContentComponent);
    let result: unknown;
    let completed = false;
    dialogRef.afterClosed.subscribe({ next: value => (result = value), complete: () => (completed = true) });

    dialogRef.close('done');

    expect(result).toBe('done');
    expect(completed).toBe(true);
  });

  it('should emit the close result when the dialog closes without animation', async () => {
    const dialogRef = service.open(TestDialogContentComponent, { options: { animationType: 'none' } });
    await (dialogRef.nativeElement as unknown as { updateComplete: Promise<boolean> }).updateComplete;
    const results: unknown[] = [];
    dialogRef.afterClosed.subscribe(value => results.push(value));

    dialogRef.close('done');

    expect(results).toEqual(['done']);
  });
});
