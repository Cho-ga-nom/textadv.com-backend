import { Body, Controller, Get, Post, UseGuards, Req, Patch, Param, Res, Logger, Redirect } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/player/dto/signup.dto';
import { UpdatePlayerDTO } from 'src/player/dto/update.dto';
import { PlayerService } from 'src/player/player.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { NicknameDTO } from 'src/globalDTO/nickname.dto';
import { MessageService } from 'src/message/message.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly playerService: PlayerService,
    private readonly messageService: MessageService,
    ) {}
    private readonly logger = new Logger(AuthController.name);

    @Post('id_check/:user_id')
    async idCheck(@Param('user_id') userId: string) {
      return await this.playerService.idCheck(userId);
    }

    @Post('nickname_check')
    async nicknameCheck(@Body() nicknameDTO: NicknameDTO) {
      return await this.playerService.nicknameCheck(nicknameDTO);
    }

    @Post('signup')
    async signup(@Body() createPlayerDTO: CreatePlayerDTO) {
      return await this.playerService.createPlayer(createPlayerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response): Promise<any> {
      if(req.user.errorMsg === 14) {
        return res.send(this.messageService.notExistPlayer());
      }
      else if(req.user.errorMsg === 15) {
        return res.send(this.messageService.wrongPassword());
      }

      const user = req.user;
      const {
        accessToken,
        ...accessOption
      } = this.authService.getCookieWithJwtAccessToken(user.id);
      
      const {
        refreshToken,
        ...refreshOption
      } = this.authService.getCookieWithJwtRefreshToken(user.id);

      await this.playerService.setRefreshToken(refreshToken, user.id);
      res.cookie('Access', accessToken, accessOption);
      res.cookie('Refresh', refreshToken, refreshOption);

      return res.send({ user, refreshOption });
    }

    @UseGuards(JwtRefreshGuard)
    @Post('logout')
    async logout(@Req() req, @Res() res: Response) {
      const {
        accessOption,
        refreshOption
      } = this.authService.getCookiesForLogout();

      await this.playerService.removeRefreshToken(req.user.id);
      res.cookie('Access', '', accessOption);
      res.cookie('Refresh', '', refreshOption);
      return res.send();
    }

    @UseGuards(JwtAuthGuard)
    @Post('access')
    async access() {
      return await true;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    async refresh(@Req() req, @Res() res: Response) {
      if(req === null) {
        return await 10;
      }
      else if(req === false) {
        return await 11;
      }
      
      const user = req;
      const {
        accessToken,
        ...accessOption
      } = await this.authService.getCookieWithJwtAccessToken(user.id);

      res.cookie('Access', accessToken, accessOption)
      return res.send(true);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth')
    async googleAuth(@Req() req) {}

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth/callback')
    @Redirect('http://ec2-3-38-165-63.ap-northeast-2.compute.amazonaws.com:5000', 302)
    async googleAuthCallback(@Req() req, @Res() res: Response): Promise<any> {
      this.logger.log('controller');
      const userEmail = req.user.id;
      const headerOption = {
        httpOnly: true,
        maxAge: 600000
      }

      res.cookie('Google Login', userEmail, headerOption);
    }

    // 마이페이지 들어갈 때 비밀번호로 검사할지 결정해야 함
    @Patch('mypage/:id')
    async updatePlayer(@Param('id') id: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
      return await this.playerService.updatePlayer(id, updatePlayerDTO);
    }
}