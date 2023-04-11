import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/player/dto/login.dto';
import { PlayerService } from 'src/player/player.service';
import * as bcrypt from 'bcrypt';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService
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

  // 정상적으로 구글 로그인이 되었는지 검사
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
