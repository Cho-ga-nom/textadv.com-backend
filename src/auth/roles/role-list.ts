import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export enum Role {
  admin = 'admin',
  user = 'user',
}

// role-guard를 사용할 수 있게 해주는 데코레이터
export const Roles = (...roles: (keyof typeof Role)[]) =>
SetMetadata(ROLE_KEY, roles);