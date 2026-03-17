export interface IDateRange {
  from?: Date;
  to?: Date;
}

export class DateRange implements IDateRange {
  public from?: Date;
  public to?: Date;

  constructor(range?: IDateRange | null) {
    if (range) {
      this.from = range.from ? new Date(range.from) : undefined;
      this.to = range.to ? new Date(range.to) : undefined;
    }
  }

  public copy(): DateRange {
    return new DateRange(this);
  }
}
