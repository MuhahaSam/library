import { Perms } from '@/interfaces/user.interfaces';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtPayload } from '@/interfaces/user.interfaces';
 
const RoleGuard = (role: Perms): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      
      const user: JwtPayload = request.user
      const isAccessed : boolean = user.permission === role ? true : false
      return isAccessed
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;