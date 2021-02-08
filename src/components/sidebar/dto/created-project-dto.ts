import { ProjectDto } from '@/types/dto/project-dto';

export interface CreatedProjectDto extends ProjectDto {
  apiKey: string;
}
