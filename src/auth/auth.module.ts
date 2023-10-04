import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PlayerModule } from 'src/player/player.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { MessageModule } from 'src/message/message.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { TestPlayer } from 'src/player/entities/test-player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestPlayer]),
    PlayerModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: `${config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s` },
      }),
    }),
    MessageModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}