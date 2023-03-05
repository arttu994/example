import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../config';
import { JwtTokenType } from '../../constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JwtTokenType.REFRESH_TOKEN,
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly tokenConfig: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenConfig.RtSecret,
      expiresId: tokenConfig.RtExpires,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refresToken = req.headers['refresh_token'];

    return {
      ...payload,
      refresToken,
    };
  }
}
