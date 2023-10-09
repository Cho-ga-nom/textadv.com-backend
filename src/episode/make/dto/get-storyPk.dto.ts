import { IsString } from 'class-validator';

export class GetStoryPkDTO {

  @IsString()
  readonly userId: string;

  @IsString()
  readonly storyId: string;
}