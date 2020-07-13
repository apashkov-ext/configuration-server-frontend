import { TreeDto } from './tree-dto';

export interface CommitDto {
    sha: string;
    tree?: TreeDto;
}