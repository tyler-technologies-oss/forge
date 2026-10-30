import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ForgeButtonModule } from './button.module';

@Component({
  selector: 'lib-test-button-host',
  template: '<forge-button></forge-button>',
  imports: [ForgeButtonModule],
  standalone: true
})
class TestButtonHostComponent {
  public button = viewChild.required(ButtonComponent);
}

describe('ButtonComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create the underlying forge-button element', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.button().nativeElement.tagName.toLowerCase()).toBe('forge-button');
  });

  it('should proxy an input to the native element property', () => {
    const fixture = TestBed.createComponent(TestButtonHostComponent);
    fixture.detectChanges();

    fixture.componentInstance.button().theme = 'secondary';

    expect(fixture.componentInstance.button().nativeElement.theme).toBe('secondary');
  });
});
