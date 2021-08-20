import { OptionValueType } from '@/domain/option-value-type.enum';

export interface CreateOptionDto {
  optionGroup: string;
  name: string;
  description: string;
  type: OptionValueType;
  value: any;
}
