import { OptionDto } from './option-dto';

export interface OptionGroupDto {
    id: string;
    name: string;
    description: string;
    options: OptionDto[];
    nestedGroups: OptionGroupDto[];
}