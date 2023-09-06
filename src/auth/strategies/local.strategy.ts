import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginDTO } from 'src/player/dto/login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // 로그인 미들웨어
  async validate(email, password): Promise<any> {
    this.logger.debug('로컬 가드 진입');
    const payload :LoginDTO = { email, password };
    const user = await this.authService.validatePlayer(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}