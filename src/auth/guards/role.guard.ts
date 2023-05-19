import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY, Role } from '../roles/role-list';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<(keyof typeof Role)[]>(   // role 정보를 가져옴
      ROLE_KEY,
      context.getHandler(),
    );

    // user의 role과 비교하여 권한 제공 여부 결정
    const user: any = context.switchToHttp().getRequest().user;
    if(!roles.includes(user.role))
      throw new HttpException('Unauthorized', 401);
    
    return true;
  }
}