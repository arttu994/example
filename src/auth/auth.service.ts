import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Cache } from 'cache-manager';
import { jwtConfig } from '../config';
import { JwtTokenType } from '../constants';
import { UserRefresh } from '../interface';
import { JwtTokens } from '../interface/jwt.interface';
import { UsersDto } from '../users/users.dto';
import { UsersService } from '../users/users.service';
import { GenerateCacheKey } from '../utils';
import { SigninRequestDto, SigninResponseDto } from './dto/signin';
import { SignupRequestDto } from './dto/signup/SignupRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly tokenConfig: ConfigType<typeof jwtConfig>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async signin(
    user: UsersDto | UserRefresh,
    userAgent: string,
  ): Promise<JwtTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getTokens(user, JwtTokenType.ACCESS_TOKEN),
      this.getTokens(user, JwtTokenType.REFRESH_TOKEN),
    ]);

    const refreshTokenHash = await argon2.hash(refreshToken);
    const id = this.getId(user);

    await this.cacheManager.set(
      GenerateCacheKey(userAgent, id),
      refreshTokenHash,
      parseInt(this.tokenConfig.RtExpires),
    );

    return { accessToken, refreshToken };
  }

  signup(signupDto: SignupRequestDto) {
    return this.usersService.save(signupDto);
  }

  async validateUser(
    credentials: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    const { username, password } = credentials;
    const user = await this.usersService.findOneByUsername(username);
    const passwordMatches = await argon2.verify(user.password, password);

    if (user && passwordMatches) {
      return new SigninResponseDto(user);
    }

    return null;
  }

  async refresh(ua: string, user: UserRefresh): Promise<JwtTokens> {
    const refreshTokenHash: string = await this.cacheManager.get(
      GenerateCacheKey(ua, user.sub),
    );

    const refreshTokenMatches = await argon2.verify(
      refreshTokenHash,
      user.refreshToken,
    );

    if (refreshTokenMatches) {
      return this.signin(user, ua);
    }
  }

  getTokenConfig(tokenType: string) {
    switch (tokenType) {
      case JwtTokenType.ACCESS_TOKEN: {
        return [this.tokenConfig.AtExpires, this.tokenConfig.AtSecret];
      }
      case JwtTokenType.REFRESH_TOKEN: {
        return [this.tokenConfig.RtExpires, this.tokenConfig.RtSecret];
      }
    }
  }

  getId(user: UsersDto | UserRefresh): number {
    if (user instanceof UsersDto) {
      return user.id;
    }
    if (user instanceof UserRefresh) {
      return user.sub;
    }
  }

  async getTokens(payload: UsersDto | UserRefresh, tokenType: string) {
    const [expiresIn, secret] = this.getTokenConfig(tokenType);
    const id = this.getId(payload);

    const token = await this.jwtService.signAsync(
      {
        sub: id,
        username: payload.username,
        roles: payload.roles,
      },
      {
        expiresIn,
        secret,
      },
    );

    return token;
  }
}
