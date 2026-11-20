export type DataSourceFetcher<T = unknown> = (skip: number, take: number) => T[] | Promise<T[]>;
export type DataSourceValue<T = unknown> = T[];

export class DataSource<T = unknown> {
  #fetch: DataSourceFetcher<T>;
  #value: DataSourceValue<T> = [];

  constructor(fetch: DataSourceFetcher<T>) {
    this.#fetch = fetch;
  }

  public fetch(skip: number, take: number): Promise<T[]> {
    return Promise.resolve(this.#fetch(skip, take));
  }

  public get value(): DataSourceValue<T> {
    return this.#value;
  }
}
