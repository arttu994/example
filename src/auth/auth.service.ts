import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupRequestDto } from './dto/signup/SignupRequest.dto';
import * as argon2 from 'argon2';
import { SigninRequestDto, SigninResponseDto } from './dto/signin';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin() {
    throw new NotImplementedException();
  }

  signup(signupDto: SignupRequestDto) {
    return this.usersService.save(signupDto);
  }

  async validateUser(credentials: SigninRequestDto) {
    const { username, password } = credentials;
    const user = await this.usersService.findOneByUsername(username);
    const passwordMatches = await argon2.verify(user.password, password);

    if (user && passwordMatches) {
      return new SigninResponseDto(user);
    }

    return null;
  }
}
