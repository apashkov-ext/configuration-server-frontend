import { OptionValueType } from '@/domain/option-value-type.enum';

export enum ParsedValueType {
  Object = 5
}

export interface Template {
  regexp: RegExp;
  order: number;
  resultType: OptionValueType | ParsedValueType;
  parseValue?: (input: string | undefined) => any;
}
