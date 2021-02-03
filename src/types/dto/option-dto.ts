import { OptionValueType } from '../option-value-type.enum';

export interface OptionDto {
    id: string;
    name: string;
    description: string;
    value: any;
    type: OptionValueType;
}