import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly playerService: PlayerService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (request) => {
            return request?.cookies?.Refresh;
          },
        ]),
        secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        passReqToCallback: true,
      });
    }
    
    private readonly logger = new Logger(JwtRefreshStrategy.name);
    
  // 쿠키에 있는 jwt 값을 확인
  // playerService의 메소드를 호출하여 Refresh Token이 유효한지 검사
  async validate(req, payload: any) {
    const refreshToken = req.cookies?.Refresh;
    const user = await this.playerService.getUserIfRefreshTokenMatches(refreshToken, payload.id);

    if(user === null) {
      // 아이디가 일치하지 않음
      return null;
    }
    else if(user === false) {
      // 리프레시 토큰이 일치하지 않음
      return false;
    }
    else {
      // 새로운 엑세스 토큰 발급
      return user;
    }
  }
}
