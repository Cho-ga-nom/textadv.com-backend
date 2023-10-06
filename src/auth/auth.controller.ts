import { Body, Controller, Get, Post, UseGuards, Req, Patch, Param, Res, Logger, Redirect } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/player/dto/signup.dto';
import { UpdatePlayerDTO } from 'src/player/dto/update.dto';
import { PlayerService } from 'src/player/player.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly playerService: PlayerService,
    ) {}

    private readonly logger = new Logger(AuthController.name);

    @Post('signup')
    async signup(@Body() createPlayerDTO: CreatePlayerDTO): Promise<any> {
      return await this.playerService.createPlayer(createPlayerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response): Promise<any> {
      this.logger.debug('로그인 컨트롤러');
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

      return res.send(user);
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

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(@Req() req, @Res() res: Response) {
      const user = req.user;
      const {
        accessToken,
        ...accessOption
      } = this.authService.getCookieWithJwtAccessToken(user.id);

      res.cookie('Access', accessToken, accessOption)
      return user;
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