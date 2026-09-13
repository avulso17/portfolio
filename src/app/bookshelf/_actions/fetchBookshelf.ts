import { createClient } from '@/lib/utils/supabase/server'
import { IBook } from '@/types/bookshelf'
import { cookies } from 'next/headers'

export const fetchBookshelf = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: books, error } = await supabase
    .from('bookshelf')
    .select()
    .overrideTypes<Array<IBook>, { merge: false }>()

  return { books, error }
}
