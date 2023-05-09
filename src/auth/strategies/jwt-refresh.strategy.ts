import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PlayerService } from 'src/player/player.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    private readonly configService: ConfigService,
    private readonly playerService: PlayerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  // 쿠키에 있는 jwt 값을 확인
  // playerService의 메소드를 호출하여 Refresh Token이 유효한지 검사
  async validate(req, payload: any) {
    const refreshToken = req.cookies?.Refresh;

    return this.playerService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.email,
    );
  }
}
