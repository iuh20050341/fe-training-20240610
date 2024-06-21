import { Books } from '../types/book.type.api'
import http from '../utils/http'
export const getStudents = (page: number | string, limit: number | string) =>
  http.get<Books>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
