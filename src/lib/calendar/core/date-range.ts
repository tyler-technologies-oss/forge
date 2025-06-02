export interface IDateRange {
  from?: Date;
  to?: Date;
  rangeName?: string;
}

export class DateRange implements IDateRange {
  public from?: Date;
  public to?: Date;
  public rangeName?: string;

  constructor(range?: IDateRange | null) {
    if (range) {
      this.from = range.from ? new Date(range.from) : undefined;
      this.to = range.to ? new Date(range.to) : undefined;
      this.rangeName = range.rangeName ? range.rangeName : undefined;
    }
  }

  public copy(): DateRange {
    return new DateRange(this);
  }
}
