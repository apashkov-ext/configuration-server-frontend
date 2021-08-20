import { OptionValueType } from '../../domain/option-value-type.enum';

export interface OptionDto {
  id: string;
  name: string;
  description: string;
  value: any;
  type: OptionValueType;
}
