import { Body, Controller, Get, Post, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { CreatePlayerDTO } from 'src/player/dto/signup.dto';
import { UpdatePlayerDTO } from 'src/player/dto/update.dto';
import { PlayerService } from 'src/player/player.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly playerService: PlayerService
    ) {}

    @Post('signup')
    async signup(@Body() createPlayerDTO: CreatePlayerDTO) {
      return await this.playerService.createPlayer(createPlayerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
      return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth')
    async googleAuth(): Promise<void> {}

    @UseGuards(GoogleAuthGuard)
    @Get('googleAuth/callback')
    googleAuthCallback(@Req() req) {
      return this.authService.googleLogin(req);
    }

    @Patch('mypage/:email')
    async updatePlayer(@Param('email') email: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
      return await this.playerService.updatePlayer(email, updatePlayerDTO);
    }
}