import { TestBed } from '@angular/core/testing';
import { BusyIndicatorService } from './busy-indicator.service';

describe('BusyIndicatorService', () => {
  let service: BusyIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusyIndicatorService);
  });

  it('should open a busy indicator and allow it to be hidden', () => {
    const busyIndicatorRef = service.open({ message: 'Loading...' });

    expect(busyIndicatorRef.nativeElement.tagName.toLowerCase()).toBe('forge-busy-indicator');
    expect(busyIndicatorRef.nativeElement.open).toBe(true);

    busyIndicatorRef.hide();

    expect(busyIndicatorRef.nativeElement.isConnected).toBe(false);
  });

  it('should emit afterCancel when the cancel button is clicked', () => {
    const busyIndicatorRef = service.open({ cancelable: true });
    const cancelSpy = vi.fn();
    busyIndicatorRef.afterCancel.subscribe(cancelSpy);

    busyIndicatorRef.nativeElement.dispatchEvent(new CustomEvent('forge-busy-indicator-cancel'));

    expect(cancelSpy).toHaveBeenCalledOnce();

    busyIndicatorRef.hide();
  });
});
