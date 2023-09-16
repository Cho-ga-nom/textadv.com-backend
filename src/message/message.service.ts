import { Injectable } from '@nestjs/common';

enum Messages {
  SIGNUP_SUCCESS = 10,
  SIGNUP_FAIL = 11,
  LOGIN_SUCCESS = 12,
  EXIST_EMAIL = 13,
  NOT_EXIST = 14,
  WRONG_PASSWORD = 15,
  GOOGLE_LOGIN_SUCCESS = 16,
  GOOGLE_LOGIN_FAIL = 17,
  NEED_SIGNUP = 18,
  POSTING_SUCCESS = 20,
  POSTING_FAIL = 21,
  POST_UPDATE_SUCCESS = 22,
  POST_UPDATE_FAIL = 23,
  POST_DELETE_SUCCESS = 24,
  POST_DELETE_FAIL = 25,
  COMMENT_SUCCESS = 30,
  COMMENT_FAIL = 31,
  COMMENT_UPDATE_SUCCESS = 32,
  COMMENT_UPDATE_FAIL = 33,
  COMMENT_DELETE_SUCCESS = 34,
  COMMENT_DELETE_FAIL = 35,
  LIKE_UPDATE_SUCCESS = 36,
  LIKE_UPDATE_FAIL = 37,
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

  notExistPlayer() {
    return { msg: 'fail', errorMsg: Messages.NOT_EXIST };
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

  postingSuccess() {
    return { msg: 'success', successMsg: Messages.POSTING_SUCCESS };
  }

  postingFail() {
    return { msg: 'fail', errorMsg: Messages.POSTING_FAIL };
  }

  postUpdateSuccess() {
    return { msg: 'success', successMsg: Messages.POST_UPDATE_SUCCESS };
  }

  postUpdateFail() {
    return { msg: 'fail', errorMsg: Messages.POST_UPDATE_FAIL };
  }

  postDeleteSuccess() {
    return { msg: 'success', successMsg: Messages.POST_DELETE_SUCCESS };
  }

  postDeleteFail() {
    return { msg: 'fail', errorMsg: Messages.POST_DELETE_FAIL };
  }

  commentSuccess() {
    return { msg: 'success', successMsg: Messages.COMMENT_SUCCESS };
  }

  commentFail() {
    return { msg: 'fail', errorMsg: Messages.COMMENT_FAIL };
  }

  commentUpdateSuccess() {
    return { msg: 'success', successMsg: Messages.COMMENT_UPDATE_SUCCESS };
  }

  commentUpdateFail() {
    return { msg: 'fail', errorMsg: Messages.COMMENT_UPDATE_FAIL };
  }

  commentDeleteSuccess() {
    return { msg: 'success', successMsg: Messages.COMMENT_DELETE_SUCCESS };
  }

  commentDeleteFail() {
    return { msg: 'fail', errorMsg: Messages.COMMENT_DELETE_FAIL };
  }

  likeUpdateSuccess() {
    return { msg: 'success', successMsg: Messages.LIKE_UPDATE_SUCCESS };
  }

  likeUpdateFail() {
    return { msg: 'fail', errorMsg: Messages.LIKE_UPDATE_FAIL };
  }
}
