import { EnvironmentDto } from './environment-dto';

export interface ProjectDto {
  id: string;
  name: string;
  environments: EnvironmentDto[];
}
