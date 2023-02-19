import { registerAs } from '@nestjs/config';
import { ConfigTokens } from '../../constants';
import { JwtConfigOptions } from '../../interface';

export default registerAs(
  ConfigTokens.JWT,
  (): JwtConfigOptions => ({
    AtSecret: process.env.ACCESS_TOKEN_SECRET,
    AtExpires: process.env.ACCESS_TOKEN_EXPIRES,
    RtSecret: process.env.REFRESH_TOKEN_SECRET,
    RtExpires: process.env.REFRESH_TOKEN_EXPIRES,
  }),
);
