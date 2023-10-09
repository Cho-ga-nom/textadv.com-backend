import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestPlayer } from './entities/test-player.entity';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDTO } from './dto/signup.dto';
import { UpdatePlayerDTO } from './dto/update.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(TestPlayer) private testplayerRepo: Repository<TestPlayer>,
    private readonly messageService: MessageService,
  ) {}

  async idCheck(id: string): Promise<boolean> {
    const chkuser = await this.testplayerRepo.findOne({
      where: { id },
    });

    if(chkuser) {
      return false;
    }

    return true;
  }

  // 비밀번호 암호화
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // 회원가입
  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<any> {  
    try {
      const newPlayer = new TestPlayer();

      newPlayer.id = createPlayerDTO.id;
      newPlayer.password = await this.hashPassword(createPlayerDTO.password);
      newPlayer.nickname = createPlayerDTO.nickname;
      
      await this.testplayerRepo.insert(newPlayer);
      return this.messageService.signUpSuccess();
    } catch (err) {
      return this.messageService.signUpFail();
    }
  }

  // 로그인
  async findPlayer(id: string): Promise<TestPlayer | undefined> {
    const user = await this.testplayerRepo.findOne({
      where: { id },
    });

    if(user) {
      return user;
    }

    return null;
  }

  // Refresh Token 발급
  async setRefreshToken(refreshToken: string, id: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.testplayerRepo.update(id, { refresh_token: hashedRefreshToken });
  }

  // 유저의 Refresh Token이 유효한지 확인
  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.findPlayer(id);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    
    if(isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(email: string) {
    return this.testplayerRepo.update(email, {
      refresh_token: null,
    });
  }

  // 회원정보 수정
  async updatePlayer(email: string, updatePlayerDTO: UpdatePlayerDTO) {
    return await this.testplayerRepo
    .createQueryBuilder()
    .update(TestPlayer)
    .set(
      {
        nickname: updatePlayerDTO.nickname,
        password: updatePlayerDTO.password,
      }
    )
    .where("email = :player_email", { player_email: email })
    .execute()
    .catch((err) => {
      return err;
    })
  }
}