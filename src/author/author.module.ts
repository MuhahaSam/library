import { Controller, Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { UserModule } from '@/user/user.module';
@Module({
    imports: [UserModule ],
    providers:[ AuthorService ],
    controllers: [ AuthorController ]
})
export class AuthorModule {}
