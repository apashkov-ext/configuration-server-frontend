import { Project } from "@/types/project";
import { Configuration } from '@/types/configuration';

export interface SourceApi {
  projects(): Promise<Project[]>;

  createProject(projName: string): Promise<Project>;

  deleteProject(projName: string): Promise<void>;

  addConfiguration(projName: string, envName: string): Promise<Configuration>;

  removeConfiguration(projName: string, envName: string): Promise<void>;

  updateConfiguration(projName: string, envName: string, data: string): Promise<void>;
}
