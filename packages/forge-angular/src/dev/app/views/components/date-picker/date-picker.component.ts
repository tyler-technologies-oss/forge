import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import {
  ForgeDatePickerProxyModule,
  ForgeDatePickerModule,
  ForgeTextFieldModule,
  ForgeLabelValueModule,
  ForgeDividerModule,
  ForgeSelectProxyModule,
  ForgeOptionModule
} from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  imports: [
    DemoCardComponent,
    ForgeDatePickerProxyModule,
    ForgeDatePickerModule,
    FormsModule,
    ForgeTextFieldModule,
    ForgeLabelValueModule,
    ForgeDividerModule,
    ForgeSelectProxyModule,
    ForgeOptionModule
  ]
})
export class DatePickerComponent {
  public tomorrow = new Date(new Date().setHours(24));
  public basicDate = '01/01/2020';
  public commonDate: string | null = null;
  public isoDate: string | null = null;
  public customDate = new Date('01/01/2020');
  public disableDayCallbackDate = new Date();
  public disableDaysOfWeekDate = new Date();
  public disabledDaysOfWeek: number[] = [];
  public formatCb = (d: Date | null): string => {
    return d ? d.toISOString().split('T')[0] : '';
  };
  public parseCb = (val: string): Date | null => {
    if (val) {
      const split = val.split('-');

      if (split.length !== 3) {
        return null;
      }

      const yyyy = +split[0];
      const mm = +split[1];
      const dd = split[2].indexOf('T') ? +split[2].split('T')[0] : +split[2];

      if (!yyyy || isNaN(yyyy) || !mm || isNaN(mm) || !dd || isNaN(dd)) {
        return null;
      }

      return new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    }

    return null;
  };

  public disableDayCallback = (date: Date): boolean => {
    return date.toLocaleDateString() === this.tomorrow.toLocaleDateString();
  };

  public change(change: number[]): void {
    this.disabledDaysOfWeek = change;
  }
}
