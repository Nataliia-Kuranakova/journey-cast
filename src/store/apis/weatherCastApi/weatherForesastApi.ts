import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Trip,
  TripCast,
  TripCity,
  CurrentDayForecast,
  LocationData,
  LocationTrip,
  LocationTripsCast,
} from './types';

const apiKey = process.env.REACT_APP_API_WEATHER_SECRET_KEY;

const weatherForecastApi = createApi({
  reducerPath: 'weatherForecast',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services',
  }),
  endpoints: (builder) => ({
    fetchWeather: builder.query<TripCast, Trip>({
      query: (trip: Trip) => ({
        url: `/timeline/${trip.name}/${trip.start}/${trip.end}?unitGroup=metric&key=${apiKey}&include=days&elements=datetime,tempmax,tempmin,icon`,
        method: 'GET',
      }),
    }),
    fetchCurrentWeather: builder.query<CurrentDayForecast, TripCity>({
      query: (trip: Trip) => ({
        url: `/timeline/${trip.name}/today?unitGroup=metric&key=${apiKey}&include=current&elements=temp,humidity,sunsetEpoch,sunriseEpoch,windgust,windspeed,visibility,uvindex,icon,sunrise,sunset`,
        method: 'GET',
      }),
    }),
    fetchLocationsWeather: builder.query<
      LocationTripsCast | LocationTrip,
      LocationData
    >({
      query: (tripLocation: LocationData) => ({
        url: `/timelinemulti?unitGroup=metric&key=${apiKey}&locations=${tripLocation.name}&datestart=${tripLocation.currentDate}&include=days&elements=icon,temp,sunriseEpoch,sunsetEpoch`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFetchWeatherQuery,
  useFetchCurrentWeatherQuery,
  useFetchLocationsWeatherQuery,
} = weatherForecastApi;

export { weatherForecastApi };
