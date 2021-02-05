import { OptionValueType } from '@/types/option-value-type.enum';

export interface CreateOptionDto {
    optionGroup: string;
    name: string;
    description: string;
    type: OptionValueType;
    value: any;
}