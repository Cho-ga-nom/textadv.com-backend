import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.OAUTH_GOOGLE_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
      scope: ['email', 'profile'],
    });
  }
  
  private readonly logger = new Logger(GoogleStrategy.name);

  // 구글 유저 정보를 api controller에게 req-user 형태로 전달
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, emails } = profile;
    const user = {
      providerId: id,
      email: emails[0].value,
      accessToken
    }

    if (!user)
      throw new UnauthorizedException();
      
    return user;
  }
}