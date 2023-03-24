import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/player/dto/login.dto';
import { PlayerService } from 'src/player/player.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
  ) {}

  // 로그인을 시도하는 사용자의 비밀번호를 검사
  async validatePlayer(loginDTO: LoginDTO): Promise<any> {
    const user = await this.playerService.findPlayer(loginDTO.email);

    if(user && await bcrypt.compare(loginDTO.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // 로그인을 성공한 사용자에게 토큰 전달
  async login(validatePlayer: any) {
    const payload = { email: validatePlayer.email, nickname: validatePlayer.nickname };
    
    return {
      access_token: this.jwtService.sign(payload),
      msg: 'success'
    }
  }

  // 정상적으로 구글 로그인이 되었는지 검사
  async googleLogin(req) {
    if(!req.user)
      return 'No user from google'

      return {
        message: 'User information from google',
        user: req.user,
      }
  }
}
