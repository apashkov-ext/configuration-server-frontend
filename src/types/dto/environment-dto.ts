import { OptionGroupDto } from './option-group-dto';

export interface EnvironmentDto {
  id: string;
  projectId: string;
  name: string;
  optionGroup: OptionGroupDto;
}