import { Project } from '@/types';

export interface ProjectsApi {
    projects(): Promise<Project[]>;
    createProject(name: string): Promise<Project>;
    deleteProject(name: string): Promise<void>;
}