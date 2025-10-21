import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  author: string;

  @IsString()
  message: string;
}

