import { Body, Controller, Get, Post, UseGuards, Req, Patch, Param, Res, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly playerService: PlayerService,
    ) {}

    @Post('signup')
    async signup(@Body() createPlayerDTO: CreatePlayerDTO): Promise<any> {
      return await this.playerService.createPlayer(createPlayerDTO);
    }

    @Post('test_signup')
    async testSignup(@Body() createPlayerDTO: CreatePlayerDTO): Promise<any> {
      return await this.playerService.testCreatePlayer(createPlayerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response): Promise<any> {
      const user = await this.authService.login(req.user);
      res.setHeader('Authorization', 'Bearer '+ user.access_token);
      res.cookie('jwt', user.access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000   // 하루 동안 쿠키 유지
      });
      return res.send(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('test_login')
    async testLogin(@Req() req, @Res() res: Response): Promise<any> {
      this.logger.warn('로그인 컨트롤러');
      const user = req.user;
      const {
        accessToken,
        ...accessOption
      } = this.authService.getCookieWithJwtAccessToken(user.email);
      
      const {
        refreshToken,
        ...refreshOption
      } = this.authService.getCookieWithJwtRefreshToken(user.email);

      await this.playerService.setRefreshToken(refreshToken, user.email);
      res.cookie('Authentication', accessToken, accessOption);
      res.cookie('Refresh', refreshToken, refreshOption);

      return res.send(user);
    }

    @Post('logout')
    async logout(@Res() res: Response) {
      const { token, ...option } = await this.authService.logout();
      res.cookie('Authentication', token, option);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('test_logout')
    async testLogout(@Req() req, @Res() res: Response) {
      this.logger.warn('로그아웃 컨트롤러');
      const {
        accessOption,
        refreshOption
      } = this.authService.getCookiesForLogout();

      await this.playerService.removeRefreshToken(req.user.email);
      res.cookie('Authentication', '', accessOption);
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
      } = this.authService.getCookieWithJwtAccessToken(user.email);

      res.cookie('Authentication', accessToken, accessOption)
      return user;
    }

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth')
    async googleAuth(@Req() req) {
      return await this.authService.googleLogin(req);
    }

    @Patch('mypage/:email')
    async updatePlayer(@Param('email') email: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
      return await this.playerService.updatePlayer(email, updatePlayerDTO);
    }
}