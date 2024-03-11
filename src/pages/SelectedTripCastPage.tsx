import { useWeaterCastContext } from '../context/WeatherCastContext';
import useMediaQuery from '../hooks/useMediaQuery';
import useTripCastData from '../hooks/apis/useTripData';

import { minWidth } from '../consts/min-width';

import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import DetailedCast from '../components/DetailedCast';
import DailyTripCast from '../components/DailyTripCast';
import WeatherForecast from '../components/WeatherForecast';
import ErrorStatusMessage from '../components/ErrorStatusMessage';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SelectedTripCast = (): JSX.Element => {
  const { trip, searchTerm, setSearchTerm, isContainer } =
    useWeaterCastContext();
  const { error, animation, isLoading, tripCastData, tripCurrentCastData } =
    useTripCastData(trip!);

  const matches = useMediaQuery(minWidth);

  const pathLocation = useLocation();

  useEffect(() => {
    if (pathLocation.pathname !== '/trips') {
      setSearchTerm('');
    }
  }, [pathLocation.pathname, setSearchTerm, searchTerm]);

  return (
    <>
      <>
        <div className={`aside-container ${animation}`}>
          {isLoading ? (
            <Spinner sprinnerStyles="spinner" iconSize="150px">
              <div>Loading...</div>
            </Spinner>
          ) : error && !matches ? (
            <ErrorStatusMessage
              error={error}
              classNameError="error"
              classNameIcon="error-icon"
            />
          ) : (
            <>
              {tripCurrentCastData && (
                <WeatherForecast data={tripCurrentCastData} />
              )}
            </>
          )}
        </div>
        <div className={`container ${isContainer} ${animation}`}>
          {isLoading ? (
            <Skeleton isLoading={isLoading} />
          ) : error && matches ? (
            <ErrorStatusMessage
              error={error}
              classNameError="error"
              classNameIcon="error-icon"
            />
          ) : (
            <>
              {error ? null : (
                <>
                  <DailyTripCast data={tripCastData} tripDates={trip} />
                  {tripCurrentCastData && (
                    <DetailedCast data={tripCurrentCastData} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </>
    </>
  );
};

export default SelectedTripCast;
