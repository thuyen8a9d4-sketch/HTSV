import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { OAuthProfile } from '../oauth-profile.interface';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('FACEBOOK_APP_ID') || 'not-configured',
      clientSecret: config.get<string>('FACEBOOK_APP_SECRET') || 'not-configured',
      callbackURL: config.getOrThrow<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'emails', 'displayName'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: Error | null, user?: OAuthProfile | false) => void,
  ) {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(
        new BadRequestException(
          'Tài khoản Facebook không cấp quyền email, không thể đăng nhập',
        ),
        false,
      );
    }
    const oauthProfile: OAuthProfile = {
      provider: 'facebook',
      providerId: profile.id,
      email,
      fullName: profile.displayName || email.split('@')[0],
    };
    done(null, oauthProfile);
  }
}
