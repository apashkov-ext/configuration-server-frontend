import { CommitDto } from './commit-dto';

export interface BranchDto {
  name: string;
  commit: CommitDto;
}
