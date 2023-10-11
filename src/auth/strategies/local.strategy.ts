import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginDTO } from 'src/player/dto/login.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }
  
  private readonly logger = new Logger(LocalStrategy.name);
  
  // 로그인 미들웨어
  async validate(id, password): Promise<any> {
    const payload :LoginDTO = { id, password };
    const user = await this.authService.validatePlayer(payload);

    return user;
  }
}