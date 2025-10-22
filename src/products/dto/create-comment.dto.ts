import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string; // ID del usuario 

  @IsString()
  @IsNotEmpty()
  readonly username: string; // nombre de usuario

  @IsString()
  @IsNotEmpty()
  readonly content: string; // comentario
}