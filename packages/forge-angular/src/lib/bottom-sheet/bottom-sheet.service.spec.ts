import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BottomSheetService } from './bottom-sheet.service';

@Component({
  selector: 'lib-test-bottom-sheet-content',
  template: '<span>bottom sheet content</span>',
  standalone: true
})
class TestBottomSheetContentComponent {}

describe('BottomSheetService', () => {
  let service: BottomSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottomSheetService);
  });

  it('should open a bottom sheet and attach the given component', () => {
    const bottomSheetRef = service.show(TestBottomSheetContentComponent);

    expect(bottomSheetRef.nativeElement.tagName.toLowerCase()).toBe('forge-bottom-sheet');
    expect(document.body.contains(bottomSheetRef.nativeElement)).toBe(true);

    bottomSheetRef.close();
  });
});
