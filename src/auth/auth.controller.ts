import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup/SignupRequest.dto';
import { SignupResponseDto } from './dto/signup';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin() {
    return this.authService.signin();
  }

  @Post('signup')
  async signup(signupDto: SignupRequestDto) {
    const signedUpUser = await this.authService.signup(signupDto);

    return new SignupResponseDto(signedUpUser);
  }
}
