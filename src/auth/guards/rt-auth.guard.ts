import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtTokenType } from '../../constants';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(
  JwtTokenType.REFRESH_TOKEN,
) {}
