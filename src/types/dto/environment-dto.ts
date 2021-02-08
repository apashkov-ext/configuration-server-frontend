import { OptionGroupDto } from './option-group-dto';

export interface EnvironmentDto {
  id: string;
  name: string;
  optionGroup: OptionGroupDto;
}
