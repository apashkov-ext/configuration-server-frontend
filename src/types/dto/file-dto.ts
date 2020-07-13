import { ContentDto } from './content-dto';
import { CommitDto } from './commit-dto';

export interface FileDto {
    content: ContentDto;
    commit: CommitDto;
}