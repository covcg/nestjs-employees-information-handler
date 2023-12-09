import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor() {}
  signup(signupDto: SignupDto) {
    return {
      message: 'signed up!',
      ...signupDto,
    };
  }
  signin(signinDto: SigninDto) {
    return {
      message: 'signed in!',
      ...signinDto,
    };
  }
}
