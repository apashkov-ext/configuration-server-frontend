import { OptionValueType } from '../option-value-type.enum';

export interface AddPropEvent {
    name: string;
    type: OptionValueType;
}