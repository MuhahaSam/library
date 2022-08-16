import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBook } from './entity/user.book.entity';
import { Book } from '@/book/entity/book.entitiy';
import { ForbiddenException } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { 
    UserBookingHistory,
} from '@/interfaces/userBook.interface';
import { User } from '@/user/entity/user.entity';
import { UserBookingManageDTO } from './user.book.dto';
import { UserService } from '@/user/user.service';
@Injectable()
export class UserBookService {
    constructor(
        @InjectRepository(UserBook)
        private readonly userBookRepository: Repository<UserBook>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly useService: UserService
    ){}

    async putRequestForbooking(userId: number, bookId: number): Promise<boolean>{

        const bookedBook = await this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.userBooks', 'userBooks')
        .where('book.id = :bookId ', {bookId: bookId})
        .getOne()


        if (bookedBook?.isBooking) throw new ForbiddenException('already booked')
        if (!bookedBook) throw new ForbiddenException('book not found')
        const newBookingRequest : UserBook = {
            userId: userId,
            bookId: bookId,
            requestDate: new Date(Date.now())
        }
        const alreadyRequested = await this.userBookRepository
        .createQueryBuilder('userBook')
        .where('userBook.user_id = :userId and userBook.book_id = :bookId and issuance_date is null', {
            userId: userId,
            bookId: bookId
        })
        .getOne()

        if (alreadyRequested) throw new ForbiddenException('already requested')

        await this.userBookRepository.save(newBookingRequest)
        return true
    }

    async getAllBookingRequests(adminId:number): Promise<UserBookingHistory[]>{
        await this.useService.isAdmin(adminId)

        return (await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.userBooks', 'userbooks')
            .innerJoinAndSelect('userbooks.book', 'book')
            .innerJoinAndSelect('book.author', 'author')
            .where('userbooks.issuanceDate is null')
            .select([
                'user.id', 
                'user.first_name',
                'user.last_name',
                'user.middle_name',
                'user.email',
                `jsonb_agg(
                    jsonb_build_object(
                        'id', book.id, 
                        'name', book.name,
                        'isbooking', book.isbooking,
                        'genre', book.genre,
                        'requestedDate', userbooks.request_date,
                        'issuanceDateDate', userbooks.issuance_date,
                        'planedReceivingDate', userbooks.planned_receiving_date,
                        'realReceivingDate', userbooks.real_receiving_date,
                        'userBookId', userbooks.id
                    )
                ) booking_history`
            ])
            .groupBy('user.id')
            .getRawMany()).map(x=>{
                let bookingHistorySample: UserBookingHistory  = {
                    id: x.user_id,
                    firstName: x.first_name,
                    lastName: x.last_name,
                    middleName: x.middle_name,
                    email: x.user_email,
                    bookingHistory:x.booking_history
                }
                return bookingHistorySample
            })
    }

    async putBookingRequestManage(userBookingAccess:UserBookingManageDTO, adminId:number): Promise<boolean>{
        await this.useService.isAdmin(adminId)

        const currentDate = new Date(Date.now())
        const planedReceivingDate = new Date(Date.now())
        planedReceivingDate.setDate(planedReceivingDate.getDate() + userBookingAccess.bookingDays)
        let updated
        if (userBookingAccess.status === 'access'){
            updated = await this.userBookRepository.update({
                id: userBookingAccess.userBookId,
                realReceivingDate: IsNull()
            },{
                plannedReceivingDate : planedReceivingDate,
                issuanceDate: currentDate,
                adminId: adminId
            })  
        }else{
            updated = await this.userBookRepository.update({
                id: userBookingAccess.userBookId,
                realReceivingDate: IsNull()
            },{
                rejectDate: currentDate,
                adminId: adminId
            })
        }
        if(updated.affected === 0) return false
        return true
       
    }

    async putUserBookReceiving(bookId: number, userId:number , adminId: number): Promise<boolean>{
        await this.useService.isAdmin(adminId)

        const updated = await this.userBookRepository.update({
            bookId: bookId,
            userId: userId,
            realReceivingDate: IsNull()
        },{
            realReceivingDate: new Date(Date.now())
        })
        if (updated.affected === 0) return false
        return true
    }

}
