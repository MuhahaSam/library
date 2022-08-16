import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { 
    Get, 
    Post, 
    Body,
    HttpStatus,
    HttpCode,
    UseGuards
 } from '@nestjs/common';
import { 
    UserDTO,
    AuthDTO
} from './user.dto';
import { PermissionTypeEnum, Tokens } from '@/interfaces/user.interfaces';
import { Public } from '@/common/decorators';
import { GetCurrentUserId } from '@/common/decorators';
import { GetCurrentUser } from '@/common/decorators';
import { JwtPayload } from '@/interfaces/user.interfaces';
import { RtGuard } from '@/common/guards';
import RoleGuard from '@/common/roles/role.decorator'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user: UserDTO): Promise<Tokens>{
        return this.userService.register(user)
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() auth: AuthDTO): Promise<Tokens>{
        return this.userService.login(auth)
    }

    @Public()
    @Post('login/admin')
    @HttpCode(HttpStatus.OK)
    loginAdmin(@Body() auth: AuthDTO): Promise<Tokens>{
        return this.userService.login(auth, true)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean>{
        return this.userService.logOut(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId:number , @GetCurrentUser('token') refreshToken: string): Promise<Tokens> {
        return this.userService.refreshToken(userId, refreshToken)
    }
}
