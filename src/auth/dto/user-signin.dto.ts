import { IsString, IsStrongPassword } from 'class-validator';

export class UserSignInDto {
  @IsString()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
