import { SetMetadata } from '@nestjs/common';

export type RoleCode = 'ADMIN' | 'LECTURER' | 'STUDENT';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleCode[]) => SetMetadata(ROLES_KEY, roles);
