import useMediaQuery from '../hooks/useMediaQuery';
import useTripCastData from '../hooks/apis/useTripData';
import useSortTripsList from '../hooks/useSortTripsList';
import { useWeaterCastContext } from '../context/WeatherCastContext';

import { minWidth } from '../consts/min-width';

import Spinner from '../components/Spinner';
import Skeleton from '../components/Skeleton';
import DetailedCast from '../components/DetailedCast';
import DailyTripCast from '../components/DailyTripCast';
import WeatherForecast from '../components/WeatherForecast';
import ErrorStatusMessage from '../components/ErrorStatusMessage';

const NearestTripCastPage = (): JSX.Element => {
  const { isContainer } = useWeaterCastContext();
  const sortedTripsList = useSortTripsList();

  const skipQuery = !sortedTripsList[0];
  const skip = { skip: skipQuery };

  const { error, animation, isLoading, tripCastData, tripCurrentCastData } =
    useTripCastData(sortedTripsList[0], skip);

  const matches = useMediaQuery(minWidth);

  return (
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
                <DailyTripCast
                  data={tripCastData}
                  tripDates={sortedTripsList[0]}
                />
                {tripCurrentCastData && (
                  <DetailedCast data={tripCurrentCastData} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NearestTripCastPage;
