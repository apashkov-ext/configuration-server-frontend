export class FileNameMatcher {
  private readonly regexp: RegExp;

  constructor(filemask: string) {
    this.regexp = new RegExp(`^${filemask}(.(?<env>[a-zA-Z]+))?.json`);
  }

  public isCorrectName(name: string): boolean {
    return this.regexp.test(name);
  }

  public extractEnv(name: string): string {
    const result = this.regexp.exec(name);
    return (result && result.groups && result.groups["env"]) || "";
  }
}
