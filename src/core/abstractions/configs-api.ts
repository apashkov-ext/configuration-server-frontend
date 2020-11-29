import { Configuration } from '@/types';

export interface ConfigsApi {
    addConfiguration(projName: string, envName: string): Promise<Configuration>;
    removeConfiguration(projName: string, envName: string): Promise<void>;
    updateConfiguration(projName: string, envName: string, data: string): Promise<void>;
}