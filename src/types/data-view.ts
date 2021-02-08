export class DataView {
  private _projectName: string;
  public get projectName(): string {
    return this._projectName;
  }

  private _configName: string;
  public get configName(): string {
    return this._configName;
  }

  private _content: string;
  public get content(): string {
    return this._content;
  }

  constructor(projName: string, configName: string, content: string) {
    this._projectName = projName;
    this._configName = configName;
    this._content = content;
  }
}
