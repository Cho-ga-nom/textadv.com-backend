import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { TestPlayer } from './entities/test-player.entity';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDTO } from './dto/signup.dto';
import { UpdatePlayerDTO } from './dto/update.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    @InjectRepository(TestPlayer) private testplayerRepo: Repository<TestPlayer>, 
    private readonly messageService: MessageService,
  ) {}

  // 비밀번호 암호화
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // 회원가입
  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<any> {
    const email = createPlayerDTO.email;
    const chkuser = await this.playerRepo.findOne({
      where: { email },
    });

    if(chkuser) {
      return this.messageService.existEmail();
    }
    
    try {
      const newPlayer = new Player();

      newPlayer.email = createPlayerDTO.email;
      newPlayer.password = await this.hashPassword(createPlayerDTO.password);
      newPlayer.nickname = createPlayerDTO.nickname;
      
      await this.playerRepo.insert(newPlayer);
      return this.messageService.signUpSuccess();
    } catch (err) {
      return this.messageService.signUpFail();
    }
  }

  // 테스트용 회원가입
  async testCreatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<any> {
    try {
      const newPlayer = new TestPlayer();

      newPlayer.email = createPlayerDTO.email;
      newPlayer.password = await this.hashPassword(createPlayerDTO.password);
      newPlayer.nickname = createPlayerDTO.nickname;
      
      await this.testplayerRepo.insert(newPlayer);
      return this.messageService.signUpSuccess();
    } catch (err) {
      return this.messageService.signUpFail();
    }
  }

  // 로그인
  async findPlayer(email: string): Promise<Player | undefined> {
    const user = await this.playerRepo.findOne({
      where: { email },
    });

    if(user) {
      return user;
    }

    return null;
  }

  // 테스트용 유저 조회
  async testfindPlayer(email: string): Promise<TestPlayer | undefined> {
    const user = await this.testplayerRepo.findOne({
      where: { email },
    });

    if(user) {
      return user;
    }

    return null;
  }

  // Refresh Token 발급
  async setRefreshToken(refreshToken: string, email: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.testplayerRepo.update(email, { refresh_token: hashedRefreshToken });
  }

  // 유저의 Refresh Token이 유효한지 확인
  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.testfindPlayer(email);
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
    return await this.playerRepo
    .createQueryBuilder()
    .update(Player)
    .set(
      {
        nickname: updatePlayerDTO.nickname,
        password: updatePlayerDTO.password,
      }
    )
    .where("email = :player_email", { player_email: email })
    .execute()
    .then(() => {
      return { msg: 'success' };
    })
    .catch(() => {
      throw new NotFoundException('회원 정보 업데이트 실패');
    })
  }
}