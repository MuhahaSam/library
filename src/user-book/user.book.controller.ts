import { Body, Controller } from '@nestjs/common';
import { 
    Get,
    Put,
    Post
 } from '@nestjs/common';
import { BookIdDTO } from '@/book/book.dto';
import { 
    UserBookingManageDTO,
    UserBookReceiveDTO
 } from './user.book.dto';
import { UserBookService } from './user.book.service';
import { GetCurrentUserId } from '@/common/decorators';
import { UseGuards } from '@nestjs/common';
import RoleGuard from '@/common/roles/role.decorator';

@Controller('userBook')
export class UserBookController {
    constructor(
        private userBookService: UserBookService
    ){}

    @Put('booking')
    async putRequestForBooking(@GetCurrentUserId() userId:number, @Body() body :BookIdDTO): Promise<boolean>{
        return this.userBookService.putRequestForbooking(userId, body.bookId)
    }

    @Get('all-requests')
    @UseGuards(RoleGuard('admin'))
    async getAllBookingRequests(@GetCurrentUserId() adminId:number){
        return this.userBookService.getAllBookingRequests(adminId)
    }

    @Put('manage-booking')
    @UseGuards(RoleGuard('admin'))
    async putBookingRequestManage(@Body() body: UserBookingManageDTO, @GetCurrentUserId() adminId:number):Promise<boolean> {
        return this.userBookService.putBookingRequestManage(body, adminId)
    }

    @Put('receive-book')
    @UseGuards(RoleGuard('admin'))
    async putUserBookReceiving(@Body() body:UserBookReceiveDTO,  @GetCurrentUserId() adminId:number):Promise<boolean> {
        return this.userBookService.putUserBookReceiving(body.bookId, body.userId, adminId)
    }
}
