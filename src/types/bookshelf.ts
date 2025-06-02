export interface IBook {
  created_at: string
  id: string
  image: string
  name: string
}

export interface IBookshelf {
  books: IBook[]
}
