import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Like the default 'jwt' guard, but never blocks the request - if no/invalid
 * token is present, request.user stays null instead of throwing 401. Use on
 * routes that are public but should personalize their response when a valid
 * token happens to be present (e.g. "does this viewer already have access").
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(_err: unknown, user: unknown): TUser {
    return (user ?? null) as TUser;
  }
}
