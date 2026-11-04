import { Component } from '@angular/core';
import { IChipComponent, IChipDeleteEventData } from '@tylertech/forge';
import { ForgeChipFieldModule, ForgeChipProxyModule } from '@tylertech/forge-angular';

@Component({
  selector: 'app-chip-field-simple',
  templateUrl: './chip-field-simple.component.html',
  styleUrls: ['./chip-field-simple.component.scss'],
  imports: [ForgeChipFieldModule, ForgeChipProxyModule]
})
export class ChipFieldSimpleComponent {
  public members: string[] = ['test 1', 'test 2'];

  public addMember(event$: CustomEvent<string>): void {
    const value = event$.detail;
    this.members.push(value);
  }

  public deleteMember(event$: CustomEvent<HTMLElement | IChipDeleteEventData>): void {
    const chipVal = (event$.detail as IChipComponent | IChipDeleteEventData).value;
    const index = this.members.findIndex(x => x === chipVal);
    if (index === -1) {
      return;
    }

    this.members.splice(index, 1);
  }
}
