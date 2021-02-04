import { OptionValueType } from '@/types/option-value-type.enum';

export interface UpdateOptionDto {
    name: string;
    description: string;
    value: any;
    type?: OptionValueType;
}