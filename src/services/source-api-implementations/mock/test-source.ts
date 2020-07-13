import { SourceApi } from "@/services/source-api";
import { Project } from "@/types/project";
import { Configuration } from "@/types/configuration";

export class TestSource implements SourceApi {
  async projects(): Promise<Project[]> {
    return [
      new Project("b2b-mars", [
        new Configuration("", "default"),
        new Configuration("test", "test"),
        new Configuration("last", "last"),
        new Configuration("release", "release")
      ]),
      new Project("shatl", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("last", "last"),
        new Configuration("prod", "prod"),
        new Configuration("sggo", "sggo")
      ]),
      new Project("registration", [
        new Configuration("", "default"),
      ]),
      new Project("mobile-app", [
        new Configuration("", "default"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("sggo", [
        new Configuration("", "default"),
        new Configuration("test", "test"),
        new Configuration("last", "last")
      ]),
      new Project("loris", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("111", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("222", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("333", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("444", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("5555", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("6", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("7", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("8", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("9", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("9", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("10", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("11", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("12", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("13", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("14", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("15", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("16", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("17", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("18", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("19", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ]),
      new Project("20", [
        new Configuration("", "default"),
        new Configuration("dev", "dev"),
        new Configuration("test", "test"),
        new Configuration("release", "release")
      ])
    ];
  }

  async createProject(projName: string): Promise<Project> {
    return new Project(projName, [new Configuration('', 'default')])
  }

  async deleteProject(projName: string): Promise<void> {
    return;
  }

  async addConfiguration(projName: string, envName: string): Promise<Configuration> {
    return new Configuration(envName, envName);
  }
  
  async removeConfiguration(projName: string, envName: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateConfiguration(projName: string, envName: string): Promise<void> {
    return;
  }
}
