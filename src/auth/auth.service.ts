import { Injectable, NotImplementedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupRequestDto } from './dto/SignupRequest.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signin() {
    throw new NotImplementedException();
  }

  signup(signupDto: SignupRequestDto) {
    return this.usersService.save(signupDto);
  }
}
