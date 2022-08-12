import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@/interfaces/user.interfaces';
import settings from '@/settings';

@Injectable()
export class AcctokStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: settings.jwtKeys.access,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}