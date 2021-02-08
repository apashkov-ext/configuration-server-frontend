export class Configuration {
  private _environment: string;
  public get environment(): string {
    return this._environment;
  }

  private _data: string;
  public get data(): string {
    return this._data;
  }

  constructor(environment: string, data: string) {
    this._environment = environment;
    this._data = data;
  }

  public updateData(data: string) {
    this._data = data;
  }
}
