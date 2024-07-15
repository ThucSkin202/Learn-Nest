import { IsString, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(2)
  firstName: string;
  @MinLength(2)
  lastName: string;
}
