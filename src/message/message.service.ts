import { Injectable } from '@nestjs/common';

enum Messages {
  SIGNUP_SUCCESS = 10,
  SIGNUP_FAIL = 11,
  LOGIN_SUCCESS = 12,
  EXIST_EMAIL = 13,
  WRONG_EMAIL = 14,
  WRONG_PASSWORD = 15,
  GOOGLE_LOGIN_SUCCESS = 16,
  GOOGLE_LOGIN_FAIL = 17,
  NEED_SIGNUP = 18,
}

@Injectable()
export class MessageService {
  signUpSuccess() {
    return { msg: 'success', successMsg: Messages.SIGNUP_SUCCESS };
  }

  signUpFail() {
    return { msg: 'fail', errorMsg: Messages.SIGNUP_FAIL };
  }

  loginSuccess() {
    return { msg: 'success', successMsg: Messages.LOGIN_SUCCESS };
  }

  existEmail() {
    return { msg: 'fail', errorMsg: Messages.EXIST_EMAIL };
  }

  wrongEmail() {
    return { msg: 'fail', errorMsg: Messages.WRONG_EMAIL };
  }

  wrongPassword() {
    return { msg: 'fail', errorMsg: Messages.WRONG_PASSWORD };
  }

  googleLoginSuccess() {
    return { msg: 'success', successMsg: Messages.GOOGLE_LOGIN_SUCCESS };
  }

  googleLoginFail() {
    return { msg: 'fail', errorMsg: Messages.GOOGLE_LOGIN_FAIL };
  }

  needSignUp() {
    return { msg: 'fail', errorMsg: Messages.NEED_SIGNUP };
  }
}
