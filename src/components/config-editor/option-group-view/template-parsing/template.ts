import { OptionValueType } from '@/types/option-value-type.enum';

export interface Template {
  regexp: RegExp;
  priority: number;
  resultType?: OptionValueType;
  parseValue?: (input?: string) => any;
}
