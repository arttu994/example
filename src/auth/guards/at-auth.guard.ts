import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtTokenType } from '../../constants';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard(
  JwtTokenType.ACCESS_TOKEN,
) {}
