import { OptionValueType } from '../../domain/option-value-type.enum';

export interface AddPropEvent {
  name: string;
  type: OptionValueType;
}
