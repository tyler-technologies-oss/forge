import { ICustomElementCore } from '@tylertech/forge-core';
import { IStepAdapter } from './step-adapter';
import { StepIcons, STEP_CONSTANTS } from './step-constants';

export interface IStepCore extends ICustomElementCore {
  index: number;
  editable: boolean;
  completed: boolean;
  error: boolean;
  selected: boolean;
  alternative: boolean;
  vertical: boolean;
}

export class StepCore implements IStepCore {
  private _index: number;
  private _completed: boolean;
  private _editable: boolean;
  private _error: boolean;
  private _selected: boolean;
  private _alternative: boolean;
  private _disabled: boolean;
  private _iconState: StepIcons;
  private _vertical: boolean;
  private _expanded: boolean;
  private _ignoreUserExpansion: boolean;
  private _initialized: boolean;
  private _expandedContentFocused: boolean;
  private _clickListener: EventListener;
  private _expansionContentFocusInListener: EventListener;
  private _expansionContentFocusOutListener: EventListener;
  private _expansionContentSlotChangeListener: EventListener;

  constructor(private _adapter: IStepAdapter) {
    this._clickListener = () => this._onClickListener();
    this._expansionContentSlotChangeListener = evt => this._onExpansionContentSlotChange(evt);
    this._expansionContentFocusInListener = evt => this._onExpansionContentFocusIn(evt as FocusEvent);
    this._expansionContentFocusOutListener = evt => this._onExpansionContentFocusOut(evt as FocusEvent);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._applySelected();
    this._toggleIcon();
    if (this._vertical) {
      this._adapter.addExpansionPanel();
      this._adapter.addExpansionIcon();
      this._adapter.setClickListener(this._clickListener);
      this._adapter.setSlotListener(this._expansionContentSlotChangeListener);
      this._adapter.addExpansionPanelListener('focusin', this._expansionContentFocusInListener);
      this._adapter.addExpansionPanelListener('focusout', this._expansionContentFocusOutListener);
    }
    this._initialized = true;
  }

  public disconnect(): void {
    this._adapter.removeClickListener(this._clickListener);
    this._adapter.removeSlotListener(this._expansionContentSlotChangeListener);
    this._adapter.removeExpansionPanelListener('focusin', this._onExpansionContentFocusIn);
    this._adapter.removeExpansionPanelListener('focusout', this._onExpansionContentFocusOut);
  }

  public get index(): number {
    return this._index;
  }
  public set index(value: number) {
    if (this._index !== value) {
      this._index = value;
      this._applyIndex();
      this._adapter.setHostAttribute(STEP_CONSTANTS.attributes.INDEX, value.toString());
    }
  }

  public get editable(): boolean {
    return this._editable;
  }
  public set editable(value: boolean) {
    if (this._editable !== value) {
      this._editable = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.EDITABLE, value);
      this._applyEditable();
    }
  }

  public get completed(): boolean {
    return this._completed;
  }
  public set completed(value: boolean) {
    if (this._completed !== value) {
      this._completed = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.COMPLETED, value);
      this._applyCompleted();
    }
  }

  public get error(): boolean {
    return this._error;
  }
  public set error(value: boolean) {
    if (this._error !== value) {
      this._error = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.ERROR, value);
      this._applyError();
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.SELECTED, value);
      this._applySelected();
    }
  }

  public get alternative(): boolean {
    return this._alternative;
  }
  public set alternative(value: boolean) {
    if (this._alternative !== value) {
      this._alternative = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.ALTERNATIVE, value);
      this._applyAlternative();
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
    this._applyDisabled();
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    if (value !== this._vertical) {
      this._vertical = value;
      this._applyVertical();

      if (this._initialized) {
        if (this._vertical) {
          this._adapter.addExpansionPanel();
          this._adapter.addExpansionIcon();

          this._adapter.setClickListener(this._clickListener);
          this._adapter.setSlotListener(this._expansionContentSlotChangeListener);
        } else {
          this._adapter.removeClickListener(this._clickListener);
          this._adapter.removeSlotListener(this._expansionContentSlotChangeListener);

          this._adapter.removeExpansionPanel();
          this._adapter.removeExpansionIcon();
        }
      }
    }
  }

  public get expanded(): boolean {
    return this._expanded;
  }
  public set expanded(value: boolean) {
    if (value !== this._expanded) {
      this._expanded = value;
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.EXPANDED, this._expanded);
      if (this._initialized) {
        this._applyExpanded();
      }
    }
  }

  public get ignoreUserExpansion(): boolean {
    return this._ignoreUserExpansion;
  }
  public set ignoreUserExpansion(value: boolean) {
    if (value !== this._ignoreUserExpansion) {
      this._ignoreUserExpansion = value;
    }
  }

  private _applyExpanded(): void {
    this._adapter.setExpanded(this._expanded);
  }

  private _applyVertical(): void {
    this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.VERTICAL, this._vertical);
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.VERTICAL, this._vertical);
  }

  private _applyAlternative(): void {
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.ALTERNATIVE, this._alternative);
  }

  private _applySelected(): void {
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.SELECTED, this._selected);
    this._adapter.setHostAttribute(STEP_CONSTANTS.attributes.ARIA_SELECTED, (this._selected || false).toString());
    this._adapter.hostElement.tabIndex = this._selected ? 0 : -1;
    this._toggleIcon();
  }

  private _applyIndex(): void {
    this._adapter.setIndex(this._index);
  }

  private _applyEditable(): void {
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.EDITABLE, this._editable);
    this._toggleIcon();
  }

  private _applyCompleted(): void {
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.COMPLETED, this._completed);
    this._toggleIcon();
  }

  private _applyError(): void {
    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.ERROR, this._error);

    this._toggleIcon();
  }

  private _applyDisabled(): void {
    this._adapter.toggleDisabled(this._disabled);
    this._toggleIcon();
  }

  private _getIconState(): StepIcons {
    if (this._error) {
      return 'warning';
    }

    if (this._completed) {
      if (this._editable) {
        return 'mode_edit';
      }

      return 'check';
    }

    if (this._editable && this._selected && !this._disabled) {
      return 'mode_edit';
    }

    if (this._disabled) {
      return 'block';
    }

    return '';
  }

  private _toggleIcon(): void {
    this._iconState = this._getIconState();
    this._adapter.toggleIcon(this._iconState, this._iconState !== '');
  }

  private _toggleExpanded(): void {
    if (this._adapter.slotHasContent()) {
      this._expanded = !this._expanded;
      this._applyExpanded();
      this._adapter.toggleHostAttribute(STEP_CONSTANTS.attributes.EXPANDED, this._expanded);
    }
  }

  private _onClickListener(): void {
    if (this._vertical && !this._ignoreUserExpansion) {
      this._toggleExpanded();
    }
  }

  private _onExpansionContentSlotChange(evt: Event): void {
    const hasSlotContent = this._adapter.slotHasContent();

    if (hasSlotContent) {
      this._adapter.setHostAttribute(STEP_CONSTANTS.attributes.EXPANDABLE);
      this._applyExpanded();
      // The animations on the initial slot content  is causing the panel not to open correctly. Opting out for animations on initialization
      this._adapter.setExpansionPanelAnimations(true);
    } else {
      this._adapter.removeHostAttribute(STEP_CONSTANTS.attributes.EXPANDABLE);
      this._adapter.setExpansionPanelAnimations(false);
    }

    this._adapter.toggleRootClass(STEP_CONSTANTS.classes.EXPANDABLE, hasSlotContent);
  }

  private _onExpansionContentFocusIn(event: FocusEvent): void {
    if (!this._expandedContentFocused && this._adapter.isExpandedContentInFocus(event.target as HTMLElement)) {
      this._adapter.emitHostEvent(STEP_CONSTANTS.events.EXPANDED_CONTENT_FOCUSIN, this._adapter.component);
      this._expandedContentFocused = true;
    }
  }

  private _onExpansionContentFocusOut(event: FocusEvent): void {
    if (event.relatedTarget && !this._adapter.isExpandedContentInFocus(event.relatedTarget as HTMLElement)) {
      this._adapter.emitHostEvent(STEP_CONSTANTS.events.EXPANDED_CONTENT_FOCUSOUT, this._adapter.component);
      this._expandedContentFocused = false;
    }
  }
}
