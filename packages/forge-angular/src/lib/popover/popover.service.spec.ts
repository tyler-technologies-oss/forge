import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PopoverService } from './popover.service';

@Component({
  selector: 'lib-test-popover-content',
  template: '<span>popover content</span>',
  standalone: true
})
class TestPopoverContentComponent {}

describe('PopoverService', () => {
  let service: PopoverService;
  let anchorElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopoverService);
    anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);
  });

  afterEach(() => {
    anchorElement.remove();
  });

  it('should open a popover and attach the given component', () => {
    const popoverRef = service.show(TestPopoverContentComponent, { anchorElement });

    expect(popoverRef.nativeElement.tagName.toLowerCase()).toBe('forge-popover');
    expect(document.body.contains(popoverRef.nativeElement)).toBe(true);

    popoverRef.close();
  });
});
