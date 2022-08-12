import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { AcctokStrategy, RefrtokStrategy } from './strategies';

@Module({
    imports:[
        JwtModule.register({})
    ],
    controllers:[ UserController ],
    providers: [UserService, AcctokStrategy, RefrtokStrategy]
})
export class UserModule {}
