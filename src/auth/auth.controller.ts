import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserSignInDto } from './dto/user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(userDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: UserSignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
