import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthShort' })
export class MonthShortPipe implements PipeTransform {
  public transform(value: number): string | null {
    if (typeof value !== 'number') {
      return null;
    }
    const date = new Date(2000, value - 1);
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  }
}
