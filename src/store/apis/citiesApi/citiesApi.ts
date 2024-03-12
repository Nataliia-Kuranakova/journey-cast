import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CitiesList } from './types';

const citiesApiKey = process.env.REACT_APP_API_GEONAMES_SECRET_KEY;

const citiesApi = createApi({
  reducerPath: 'cities',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://secure.geonames.org/searchJSON?q=',
  }),
  endpoints: (builder) => ({
    fetchCity: builder.query<CitiesList, string>({
      query: (city: string) => ({
        url: `${city}&maxRows=5&username=${citiesApiKey}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchCityQuery, useLazyFetchCityQuery } = citiesApi;

export { citiesApi };
