import { OptionValueType } from '@/types/option-value-type.enum';

export interface TemplateParsingResult {
  name: string;
  value: any;
  isGroup: boolean;
  type?: OptionValueType;
}
