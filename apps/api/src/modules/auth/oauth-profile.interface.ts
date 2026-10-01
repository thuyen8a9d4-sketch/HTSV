import { BadRequestException } from '@nestjs/common';

export interface OAuthProfile {
  provider: 'google' | 'facebook';
  providerId: string;
  email: string;
  fullName: string;
}

/** Shared by the Google/Facebook Passport strategies' validate() callbacks. */
export function toOAuthProfile(
  provider: OAuthProfile['provider'],
  providerId: string,
  email: string | undefined,
  displayName: string | undefined,
  missingEmailMsg: string,
): OAuthProfile {
  if (!email) throw new BadRequestException(missingEmailMsg);
  return {
    provider,
    providerId,
    email,
    fullName: displayName || email.split('@')[0],
  };
}
