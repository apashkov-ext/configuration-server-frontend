import { ConfigurationDto } from './configuration-dto';

export interface ProjectDto {
    name: string;
    configurations: ConfigurationDto[];
}