import { OptionValueType } from '@/types/option-value-type.enum';
import { ParsedValueType } from './template';

export interface TemplateParsingResult {
  name: string;
  value: any;
  type: OptionValueType | ParsedValueType;
}
