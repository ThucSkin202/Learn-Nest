import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsEmail()
  email: string;
  profileId?: number;
  postIds?: number[];
  projectIds?: number[];
}
