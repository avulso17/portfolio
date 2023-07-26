import { BASE_URL } from '@/envs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IMidjourneyAPI } from '../types/midjourney'

export const midjourneyApi = createApi({
  reducerPath: 'midjourneyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      const token = localStorage.getItem('token')
      if (token != null) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getImagine: builder.mutation<
      Pick<IMidjourneyAPI, 'imagineRes'>,
      Pick<IMidjourneyAPI, 'imagineReq'>
    >({
      query: (prompt) => ({
        url: `imagine/${prompt}`,
        method: 'POST',
        body: {
          prompt,
          callbackURL: '',
        },
      }),
    }),
  }),
})

export const { useGetImagineMutation } = midjourneyApi
