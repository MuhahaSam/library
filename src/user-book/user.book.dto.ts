import {
    IsOptional, 
    IsString,
    IsDefined,
    isInt,
    IsInt,
    IsEnum
} from 'class-validator';

enum BookingStatusEnum {
    'access',
    'reject'
  }

export class UserBookingManageDTO {

    @IsEnum(BookingStatusEnum)
    status: "access" | "reject"

    @IsInt()
    userBookId: number

    @IsInt()
    bookingDays?: number
}

export class UserBookReceiveDTO {

    @IsInt()
    userId: number

    @IsInt()
    bookId: number
}
