import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { weatherForecastApi } from './apis/weatherCastApi/weatherForesastApi';
import { citiesApi } from './apis/citiesApi/citiesApi';

export const store = configureStore({
  reducer: {
    [weatherForecastApi.reducerPath]: weatherForecastApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(weatherForecastApi.middleware)
      .concat(citiesApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export {
  useFetchWeatherQuery,
  useFetchCurrentWeatherQuery,
  useFetchLocationsWeatherQuery,
} from './apis/weatherCastApi/weatherForesastApi';

export {
  useFetchCityQuery,
  useLazyFetchCityQuery,
} from './apis/citiesApi/citiesApi';
