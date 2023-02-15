import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signin() {
    throw new NotImplementedException();
  }

  async signup() {
    throw new NotImplementedException();
  }
}
