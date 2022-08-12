import { Author } from "@/author/entity/author.entity"
import { BookInfo } from "./book.interface"

export type UserBookHistory = Pick<BookInfo, 'author'> & {
    requestDate: Date
    issuanceDate: Date
    plannedReceivingDate: Date
    realReceivingDate: Date
    userBookId: number
}

export interface UserBookingHistory {
    id: number
    firstName: string
    lastName: string
    middleName?: string
    email: string
    bookingHistory:UserBookHistory[]
}