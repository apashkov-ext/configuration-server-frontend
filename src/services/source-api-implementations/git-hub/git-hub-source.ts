import { Project } from "@/types/project";
import { GitHubClient } from "./git-hub-client";
import { SourceApi } from "../../source-api";
import { FileNameMatcher } from "./file-name-matcher";
import { ContentDto } from "@/types/dto/content-dto";
import { Configuration } from "@/types/configuration";
import { BranchDto } from '@/types/dto/branch-dto';
import { RefDto } from '@/types/dto/ref-dto';

export class GitHubSource implements SourceApi {
  private readonly matcher = new FileNameMatcher("configuration");
  private readonly client = new GitHubClient(
    "apashkov-ext",
    "1b4d44bd9a49b35e55d72e575cb37a6381c484ca",
    "ConfigurationStorage"
  );

  async projects(): Promise<Project[]> {
    const branches = (await this.client.branches()).filter(f => f.name !== 'master');
    const length = branches.length;
    if (!length) {
      return [];
    }

    const projects = new Array<Project>();

    for (let i = 0; i < branches.length; i++) {
      const proj = await this.getProjectFromBranch(branches[i]);
      projects.push(proj);
    }

    return projects;
  }

  async createProject(projName: string): Promise<Project> {
    const matched = (await this.client.matchingRefs(projName)).find(f => f.ref.endsWith(`/${projName}`));
    if (matched) {
      const existedBranch = await this.client.branch(projName);
      return this.getProjectFromBranch(existedBranch);
    }

    const masterRef = await this.client.ref('master');
    const newRef = await this.client.createRef(projName, masterRef.object.sha);
    const br = await this.client.branch(GitHubSource.getRefName(newRef));
    return this.getProjectFromBranch(br);
  }
  
  async deleteProject(projName: string): Promise<void> {
    const refs = await this.client.matchingRefs(projName);    
    const matched = refs.find(f => f.ref.endsWith(`/${projName}`));
    if (matched) {
      return this.client.deleteRef(projName);
    }
  }

  async addConfiguration(projName: string, envName: string): Promise<Configuration> {
    const defaultConfig = await this.client.content(projName, GitHubSource.buildFileName());
    const fileName = GitHubSource.buildFileName(envName);
    await this.client.createFile(fileName, projName, defaultConfig.content);
    return new Configuration(envName, atob(defaultConfig.content));
  }

  async updateConfiguration(projName: string, envName: string, data: string): Promise<void> {
    const fileName = GitHubSource.buildFileName(envName);
    const file = await this.client.content(projName, fileName);
    await this.client.updateFile(fileName, projName, file.sha, btoa(data));
  }

  async removeConfiguration(projName: string, envName: string): Promise<void> {
    const fileName = GitHubSource.buildFileName(envName);
    const file = await this.client.content(projName, fileName);
    await this.client.deleteFile(fileName, projName, file.sha);
  }

  private async getProjectFromBranch(branch: BranchDto): Promise<Project> {
    const contents = await this.client.contents(branch.name);
    const filtered = contents.filter(f => this.matcher.isCorrectName(f.name));
    const configs = await this.getConfigs(branch.name, filtered);

    return new Project(branch.name, configs);
  }

  private async getConfigs(branch: string, contents: ContentDto[]): Promise<Configuration[]> {
    const length = contents.length;
    if (!length) {
      return [];
    }
    const configs = new Array<Configuration>();
    for (let i = 0; i < length; i++) {
      const file = await this.client.content(branch, contents[i].name);
      configs.push(new Configuration(this.matcher.extractEnv(file.name), atob(file.content)));
    }

    return configs;
  }

  private static getRefName(ref: RefDto): string {
    return ref && ref.ref && ref.ref.replace('refs/heads/', '') || '';
  }

  private static buildFileName(envName = ''): string {
    return envName ? `configuration.${envName}.json` : 'configuration.json';;
  }
}
