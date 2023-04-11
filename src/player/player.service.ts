import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDTO } from './dto/signup.dto';
import { UpdatePlayerDTO } from './dto/update.dto';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    private readonly messageService: MessageService,
  ) {}

  // 비밀번호 암호화
  public async hashPassword(password: string): Promise<string> {
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

  // 로그인
  async findPlayer(email: string): Promise<Player | undefined> {
    const user = await this.playerRepo.findOne({
      where: { email },
    });

    if(!user) {
      return null;
    }
    
    return user;
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
    .where("email = :user_email", { user_email: email })
    .execute()
    .then(() => {
      return { msg: 'success' };
    })
    .catch(() => {
      throw new NotFoundException('회원 정보 업데이트 실패');
    })
  }
}