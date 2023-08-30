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

    @Post('test_signup')
    async testSignup(@Body() createPlayerDTO: CreatePlayerDTO): Promise<any> {
      return await this.playerService.testCreatePlayer(createPlayerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response): Promise<any> {
      this.logger.debug('로그인 컨트롤러');
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

      return res.send({ user, accessToken });
    }

    @UseGuards(LocalAuthGuard)
    @Post('test_login')
    async testLogin(@Req() req, @Res() res: Response): Promise<any> {
      this.logger.debug('로그인 컨트롤러');
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

    @UseGuards(JwtRefreshGuard)
    @Post('logout')
    async logout(@Req() req, @Res() res: Response) {
      this.logger.debug('로그아웃 컨트롤러');
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
    @Post('test_logout')
    async testLogout(@Req() req, @Res() res: Response) {
      this.logger.debug('로그아웃 컨트롤러');
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
    async googleAuth(@Req() req) {}

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth/callback')
    @Redirect('http://ec2-3-38-165-63.ap-northeast-2.compute.amazonaws.com:5000', 302)
    async googleAuthCallback(@Req() req, @Res() res: Response): Promise<any> {
      const userEmail = req.user.email;
      const headerOption = {
        httpOnly: true,
        maxAge: 600000
      }

      res.cookie('Google Login', userEmail, headerOption);
    }

    @Patch('mypage/:email')
    async updatePlayer(@Param('email') email: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
      return await this.playerService.updatePlayer(email, updatePlayerDTO);
    }
}