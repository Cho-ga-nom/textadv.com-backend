import { Injectable, Logger } from '@nestjs/common';
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

  private readonly logger = new Logger(AuthService.name);

  // 로그인을 시도하는 사용자의 비밀번호를 검사
  async validatePlayer(loginDTO: LoginDTO): Promise<any> {
    const user = await this.playerService.findPlayer(loginDTO.id);

    if(!user) {
      return this.messageService.notExistPlayer();
    }

    if(await bcrypt.compare(loginDTO.password, user.password)) {
      const { password, refresh_token, ...result } = user;
      return result;
    }
    else {
      return this.messageService.wrongPassword();
    }
  }

  // 로그인 시 Access Token 발급
  // 생성한 토큰을 쿠키 정보와 함께 반환
  getCookieWithJwtAccessToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    
    return {
      accessToken: token,
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 60,
    };
  }
  
  /**
   * Refresh Token 발금
   * Access Token이 만료된 이후 Refresh Token의 유효기간 동안
   * 새로운 Access Token 발급 가능
   * Refresh Token이 만료되면 새로 로그인 해야함
   */
  getCookieWithJwtRefreshToken(id: string) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:`${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    
    return {
      refreshToken: token,
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 600,
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
}
