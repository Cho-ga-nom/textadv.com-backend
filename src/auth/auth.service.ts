import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/player/dto/login.dto';
import { PlayerService } from 'src/player/player.service';
import * as bcrypt from 'bcrypt';
import { MessageService } from 'src/message/message.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService,
    private readonly configService: ConfigService,
  ) {}

  // 로그인을 시도하는 사용자의 비밀번호를 검사
  async validatePlayer(loginDTO: LoginDTO): Promise<any> {
    const user = await this.playerService.findPlayer(loginDTO.email);

    if(!user) {
      return this.messageService.notExistPlayer();
    }

    if(await bcrypt.compare(loginDTO.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    else {
      return this.messageService.wrongPassword();
    }
  }

  // 로그인을 성공한 사용자에게 토큰 전달
  async login(validatePlayer: any): Promise<any> {
    const payload = { email: validatePlayer.email, nickname: validatePlayer.nickname };

    return {
      email: payload.email,
      nickname: payload.nickname,
      access_token: this.jwtService.sign(payload),
      msg: this.messageService.loginSuccess(),
    }
  }

  async logout() {
    return {
      token: '',           // 로그아웃한 유저에게 비어있는 토큰값 전달
      httpOnly: true,
      maxAge: 0,
    };
  }

  // 로그인 시 Access Token 발급
  // 생성한 토큰을 쿠키 정보와 함께 반환
  getCookieWithJwtAccessToken(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });

    return {
      accessToken: token,
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 360,
    };
  }

  /**
   * Refresh Token 발금
   * Access Token이 만료된 이후 Refresh Token의 유효기간 동안
   * 새로운 Access Token 발급 가능
   * Refresh Token이 만료되면 새로 로그인 해야함
   */
  getCookieWithJwtRefreshToken(email: string) {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:`${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });

    return {
      refreshToken: token,
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
    };
  }

  // 로그아웃
  // 쿠키에 빈 값들을 넣어주기 위해 반환
  getCookiesForLogout() {
    return {
      accessOption: {
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        httpOnly: true,
        maxAge: 0,
      },
    };
  }

  // 정상적으로 구글 로그인이 되었는지 검사
  /**
   * 프론트가 아니라 백에서 구글 로그인 url 호출
   * redirect = callback url
   * 프론트에서는 구글 로그인 화면으로 라우팅해주고
   * 그 페이지에서 구글 로그인 api 호출
   */
  async googleLogin(req): Promise<any> {
    if(!req.user) {
      return this.messageService.googleLoginFail();
    }

    const chkUser = await this.playerService.findPlayer(req.user.email);

    if(!chkUser) {
      return this.messageService.needSignUp();
    }

    return {
      message: this.messageService.googleLoginSuccess(),
      user: req.user,
    }
  }
}
