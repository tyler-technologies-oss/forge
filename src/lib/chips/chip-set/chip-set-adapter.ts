import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IChipComponent } from '../chip/chip';
import { ChipType, CHIP_CONSTANTS } from '../chip/chip-constants';
import { IChipSetComponent } from './chip-set';
import { CHIP_SET_CONSTANTS } from './chip-set-constants';

export interface IChipSetAdapter extends IBaseAdapter {
  setVertical(value: boolean): void;
  setType(value: ChipType): void;
  setDense(value: boolean): void;
  setDisabled(value: boolean): void;
  tryFocusPrevious(fromChip: EventTarget | null): void;
  tryFocusNext(fromChip: EventTarget | null): void;
}

export class ChipSetAdapter extends BaseAdapter<IChipSetComponent> implements IChipSetAdapter {
  private _rootElement: HTMLElement;

  constructor(component: IChipSetComponent) {
    super(component);
    this._rootElement = getShadowElement(this._component, CHIP_SET_CONSTANTS.selectors.ROOT);
  }

  public setVertical(value: boolean): void {
    toggleClass(this._rootElement, value, CHIP_SET_CONSTANTS.classes.VERTICAL);
  }

  public setType(value: ChipType): void {
    const chips = this._getChips();
    chips.forEach(c => c.type = value);
  }

  public setDense(value: boolean): void {
    const chips = this._getChips();
    chips.forEach(c => c.dense = value);
  }

  public setDisabled(value: boolean): void {
    const chips = this._getChips();
    chips.forEach(c => c.disabled = value);
  }

  public tryFocusPrevious(fromChip: EventTarget | null): void {
    const chips = this._getChips();
    const activeChipIndex = chips.findIndex(chip => chip === fromChip);

    if (activeChipIndex >= 0) {
      if (activeChipIndex === 0) {
        chips[chips.length - 1].tryFocusDelete();
      } else {
        chips[activeChipIndex - 1].tryFocusDelete();
      }
    }
  }

  public tryFocusNext(fromChip: EventTarget | null): void {
    const chips = this._getChips();
    const activeChipIndex = chips.findIndex(chip => chip === fromChip);

    if (activeChipIndex >= 0) {
      if (activeChipIndex === chips.length - 1) {
        chips[0].focus();
      } else {
        chips[activeChipIndex + 1].focus();
      }
    }
  }

  private _getChips(): IChipComponent[] {
    return Array.from(this._component.querySelectorAll(CHIP_CONSTANTS.elementName));
  }
}
