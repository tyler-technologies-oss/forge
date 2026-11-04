import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should show a message toast and allow it to be closed', async () => {
    const toastRef = service.show('Hello world');

    expect(toastRef.nativeElement.tagName.toLowerCase()).toBe('forge-toast');

    await toastRef.close();
  });
});
