import { OptionValueType } from '@/types/option-value-type.enum';

export enum ParsedValueType {
  Object
}

export interface Template {
  regexp: RegExp;
  priority: number;
  resultType: OptionValueType | ParsedValueType;
  parseValue?: (input?: string) => any;
}
