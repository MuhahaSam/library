import { AuthorInterface } from "./author.interface"

export interface BookInfo {
    name: string
    id: number
    isBookable: boolean
    author: AuthorInterface
    genre: string
}
export type GenreBookTree = Record<string, BookInfo[]>

