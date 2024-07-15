import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  title: string;
  @IsString()
  @MinLength(4)
  content: string;
}
