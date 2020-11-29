import { Configuration } from './configuration';

export class Project {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _configurations: Configuration[];
  public get configurations(): Configuration[] {
    return this._configurations;
  }

  constructor(name: string, configurations: Configuration[]) {
    this._name = name;
    this._configurations = configurations;
  }

  public addConfig(config: Configuration) {
    if (!config) {
      throw new Error('Empty config');
    }
    this._configurations.push(config);
  }

  public removeConfig(config: Configuration) {
    if (!config) {
      throw new Error('Empty config');
    }

    const index = this._configurations.findIndex(f => f.environment === config.environment);
    if (index !== -1) {
      this._configurations.splice(index, 1);
    }
  }
}
