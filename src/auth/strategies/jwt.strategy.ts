import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          (request) => {
            return request?.cookies?.Access;
          },
        ]),
        ignoreExpiration: false,
        secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
    }
    
    private readonly logger = new Logger(JwtStrategy.name);
    
  // 토큰을 인증한 유저 정보를 api controller에게 req-user 형태로 전달
  async validate(payload: any) {
    return true;
  }
}