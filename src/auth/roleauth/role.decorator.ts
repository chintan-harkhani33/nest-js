
import { SetMetadata } from '@nestjs/common';
// import { ROLES } from '../shared/constrant/globle.constrant';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); 