import {
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup/SignupRequest.dto';
import { SignupResponseDto } from './dto/signup';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UsersDto } from '../users/users.dto';
import { LocalAuthGuard } from './guards';
import { UserAgent } from '../decorators/user-agents.decorator';
import { JwtTokens } from '../interface/jwt.interface';
import { UserRefresh } from '../interface';
import { RefreshTokenAuthGuard } from './guards/rt-auth.guard';
import { TypeOrmExceptionFilter } from '../errors/typeorm-exception.filter';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(
    @Req() req: Request,
    @CurrentUser() user: UsersDto,
    @UserAgent() userAgent: string,
  ) {
    return this.authService.signin(user, userAgent);
  }

  @Post('signup')
  @UseFilters(TypeOrmExceptionFilter)
  async signup(@CurrentUser() signupDto: SignupRequestDto) {
    const signedUpUser = await this.authService.signup(signupDto);

    return new SignupResponseDto(signedUpUser);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenAuthGuard)
  async refresh(
    @UserAgent() userAgent: string,
    @CurrentUser() user: UserRefresh,
  ): Promise<JwtTokens> {
    const tokens = await this.authService.refresh(userAgent, user);

    if (!tokens) throw new UnauthorizedException();

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
