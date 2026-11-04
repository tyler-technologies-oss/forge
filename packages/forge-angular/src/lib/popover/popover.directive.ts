import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { OnDestroy, EmbeddedViewRef } from '@angular/core';
import { POPOVER_CONSTANTS, OverlayPlacement, PopoverComponent } from '@tylertech/forge';

/**
 * Allows for declaratively specifying an element that should display a Forge popover
 * from the provided `TemplateRef`.
 */
@Directive({
  selector: '[forgePopover]',
  exportAs: 'forgePopover',
  standalone: false
})
export class PopoverDirective implements OnDestroy {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _viewContainerRef = inject(ViewContainerRef);

  private _popoverElement?: PopoverComponent;
  private _contentRef?: EmbeddedViewRef<any>;

  /** The TemplateRef to use as the embedded view for the popover. */
  @Input()
  public forgePopover: TemplateRef<any>;

  /** The popover placement around the `ElementRef`. */
  @Input()
  public forgePopoverPlacement: OverlayPlacement = 'bottom';

  /**
   * @deprecated Use static property instead.
   */
  @Input()
  public set forgePopoverCloseOnBlur(value: boolean) {
    this.persistent = !value;
  }

  /** Controls whether the popover closes when it loses focus. */
  @Input()
  public persistent = false;

  /** Adds a custom class the `<forge-popover>` element that is created by this directive. */
  @Input()
  public forgePopoverClass: string;

  public get popoverElement(): HTMLElement | undefined {
    return this._popoverElement;
  }

  constructor() {
    this._elementRef.nativeElement.addEventListener(POPOVER_CONSTANTS.events.TOGGLE, () => {
      window.requestAnimationFrame(() => this.close());
    });
  }

  /** Creates and renders a TemplateRef inside of a Forge popover. */
  public open(): void {
    if (this._popoverElement) {
      return;
    }

    // Ensure that we have a popover template
    if (this.forgePopover instanceof TemplateRef === false) {
      throw new Error('Popover template is not defined.');
    }

    // Create the embedded view from the template
    this._contentRef = this._viewContainerRef.createEmbeddedView(this.forgePopover);

    if (this._contentRef.rootNodes[0] instanceof PopoverComponent) {
      // <forge-popover> element is supplied in the template
      this._popoverElement = this._contentRef.rootNodes[0] as PopoverComponent;
      this._popoverElement.remove();
    } else {
      // Create the Forge popover element
      this._popoverElement = document.createElement('forge-popover') as PopoverComponent;

      // Because createEmbeddedView will place the template within the element defined by ViewContainerRef, we
      // need to then move the elements to children of the Forge popover element so they render within the popover
      this._contentRef.rootNodes.forEach(node => this._popoverElement?.appendChild(node));

      this._popoverElement.placement = this.forgePopoverPlacement;

      // Add the custom class (if provided)
      if (this.forgePopoverClass) {
        this._popoverElement.classList.add(this.forgePopoverClass);
      }

      this._popoverElement.persistent = this.persistent;
    }

    let hostElement: Element | ShadowRoot | null = this._elementRef.nativeElement.closest(POPOVER_CONSTANTS.selectors.HOST);
    if (!hostElement) {
      const rootNode = this._elementRef.nativeElement.getRootNode();
      const hostRootNode = rootNode instanceof ShadowRoot ? rootNode : (this._elementRef.nativeElement.ownerDocument ?? document).body;
      hostElement = hostRootNode;
    }

    hostElement.appendChild(this._popoverElement);
    this._popoverElement.anchorElement = this._elementRef.nativeElement;
    this._popoverElement.open = true;
  }

  /** Closes the Forge popover and destroys the embedded view. */
  public close(): void {
    if (this._popoverElement) {
      this._popoverElement.open = false;
      this._popoverElement = undefined;
    }

    if (this._contentRef) {
      this._contentRef.destroy();
      this._contentRef = undefined;
    }
  }

  public ngOnDestroy(): void {
    this.close();
  }
}
