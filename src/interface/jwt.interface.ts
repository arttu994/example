import { Roles } from '../roles/roles.entity';

interface JwtConfigOptions {
  AtSecret: string;
  AtExpires: string;
  RtSecret: string;
  RtExpires: string;
}

export interface AccessTokenContent {
  sub: number;
  username: string;
  roles: Roles[];
  iat: number;
  exp: number;
}

export interface AccessToken {
  accessToken: string;
}
export interface RefreshToken {
  refreshToken: string;
}
export interface JwtTokens extends AccessToken, RefreshToken {}

export default JwtConfigOptions;
