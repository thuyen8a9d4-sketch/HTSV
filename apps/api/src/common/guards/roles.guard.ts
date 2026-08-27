import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY, RoleCode } from '../decorators/roles.decorator';

/**
 * Mirrors the old ASP.NET Core setup where every route required ADMIN by
 * default and had to opt out explicitly. A route with no @Public()/@Roles()
 * at all is still ADMIN-only here.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<RoleCode[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? ['ADMIN'];

    const request = context.switchToHttp().getRequest();
    const userRoles: string[] = request.user?.roles ?? [];
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
