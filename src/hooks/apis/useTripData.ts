import { useFetchWeatherQuery, useFetchCurrentWeatherQuery } from '../../store';
import useBgGradient from '../useBgGradient';
import { Trip } from '../../store/apis/weatherCastApi/types';

interface SkipQuery {
  skip: boolean;
}

const useTripCastData = (tripData: Trip, skip?: SkipQuery) => {
  const {
    data: tripCastData,
    error: tripCastError,
    isLoading: isTripCastLoading,
  } = useFetchWeatherQuery(tripData, skip);

  const {
    data: tripCurrentCastData,
    error: tripCurrentCastError,
    isLoading: isTripCurrentCastLoading,
  } = useFetchCurrentWeatherQuery(tripData, skip);

  const isLoading = isTripCastLoading || isTripCurrentCastLoading;

  const error = tripCastError || tripCurrentCastError;

  const animation = tripCastData && tripCurrentCastData ? 'data-fade-in' : '';

  useBgGradient(tripCurrentCastData!, isLoading);

  return {
    error,
    isLoading,
    animation,
    tripCastData,
    tripCurrentCastData,
  };
};

export default useTripCastData;
