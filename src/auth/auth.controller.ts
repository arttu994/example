import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/SignupRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin() {
    return this.authService.signin();
  }

  @Post('signup')
  async signup(signupDto: SignupRequestDto) {
    return this.authService.signup(signupDto);
  }
}
