import { Component, inject } from '@angular/core';
import { IChipSelectEventData, IconRegistry } from '@tylertech/forge';
import { ToastService, ForgeChipSetModule, ForgeChipProxyModule, ForgeIconModule, ForgeIconButtonModule } from '@tylertech/forge-angular';
import { tylIconAlarm, tylIconBookmark, tylIconDirections, tylIconEvent, tylIconFace, tylIconPlace, tylIconRefresh } from '@tylertech/tyler-icons';
import { BehaviorSubject } from 'rxjs';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { AsyncPipe } from '@angular/common';

interface IChip {
  text: string;
  icon?: string;
  delete?: boolean;
}

const inputChipsSource: IChip[] = [
  { text: 'Falmouth', icon: 'place', delete: true },
  { text: 'Yarmouth', icon: 'place', delete: true },
  { text: 'Plano', icon: 'place', delete: true },
  { text: 'Renton', icon: 'place', delete: true }
];

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  imports: [DemoCardComponent, ForgeChipSetModule, ForgeChipProxyModule, ForgeIconModule, ForgeIconButtonModule, AsyncPipe]
})
export class ChipsComponent {
  private _toastService = inject(ToastService);

  public inputChips$ = new BehaviorSubject<IChip[]>([...inputChipsSource]);

  constructor() {
    IconRegistry.define([tylIconAlarm, tylIconBookmark, tylIconDirections, tylIconEvent, tylIconFace, tylIconPlace, tylIconRefresh]);
  }

  public onInputChipDeleted(chip: IChip): void {
    const ary = this.inputChips$.value;
    ary.splice(ary.indexOf(chip), 1);
    this.inputChips$.next([...ary]);
  }

  public resetInputChips(): void {
    this.inputChips$.next([...inputChipsSource]);
  }

  public onActionChipSelected(evt: CustomEvent): void {
    const detail = evt.detail as IChipSelectEventData;
    this._toastService.show(`Action chip selected: ${detail.value}`);
  }
}
