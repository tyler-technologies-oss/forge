import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DynamicComponentService } from './dynamic-component.service';

@Component({
  selector: 'lib-test-dynamic',
  template: '<span>dynamic</span>',
  standalone: true
})
class TestDynamicComponent {}

describe('DynamicComponentService', () => {
  let service: DynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentService);
  });

  it('should create and attach a component to a given element', () => {
    const target = document.createElement('div');
    const ref = service.create(TestDynamicComponent, target);

    expect(ref.instance).toBeInstanceOf(TestDynamicComponent);
    expect(target.querySelector('span')?.textContent).toBe('dynamic');

    ref.destroy();
  });

  it('should create a component without a target and expose its root element', () => {
    const ref = service.create(TestDynamicComponent);

    expect(ref.componentElement?.tagName.toLowerCase()).toBe('lib-test-dynamic');

    ref.destroy();
  });
});
