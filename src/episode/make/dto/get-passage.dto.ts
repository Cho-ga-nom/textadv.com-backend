import { IsString } from 'class-validator';

export class GetPassageDTO {

  @IsString()
  episodePk : string;
}