import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../config';
import { JwtTokenType } from '../../constants';
import { AccessTokenContent } from '../../interface/jwt.interface';
import { UsersDto } from '../../users/users.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  JwtTokenType.ACCESS_TOKEN,
) {
  constructor(
    @Inject(jwtConfig.KEY)
    tokenConfig: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenConfig.AtSecret,
      expiresIn: tokenConfig.AtExpires,
    });
  }

  async validate(payload: AccessTokenContent): Promise<Partial<UsersDto>> {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
