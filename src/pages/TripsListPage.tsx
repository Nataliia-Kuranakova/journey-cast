import useMediaQuery from '../hooks/useMediaQuery';
import useTripCastData from '../hooks/apis/useTripData';
import useSortTripsList from '../hooks/useSortTripsList';
import { useFetchLocationsWeatherQuery } from '../store';

import { minWidth } from '../consts/min-width';

import {
  LocationTrip,
  LocationTripsCast,
  RetrievedLocationTripCast,
} from '../store/apis/weatherCastApi/types';

import Skeleton from '../components/Skeleton';
import TripCard from '../components/TripCard';
import DetailedCast from '../components/DetailedCast';
import DailyTripCast from '../components/DailyTripCast';
import ErrorStatusMessage from '../components/ErrorStatusMessage';

const TripsListPage = (): JSX.Element => {
  const matches = useMediaQuery(minWidth);
  const sortedTripsList = useSortTripsList();

  const skipQuery = !sortedTripsList[0];
  const skip = { skip: skipQuery };

  const { error, animation, isLoading, tripCastData, tripCurrentCastData } =
    useTripCastData(sortedTripsList[0], skip);

  const cities = sortedTripsList.map((city) => city.name);
  const citiesString = cities.join('|');

  let date = new Date().toJSON().slice(0, 10);

  const location = {
    name: encodeURIComponent(citiesString),
    currentDate: date,
  };

  const {
    data: locationCastData,
    isLoading: isLocationCastLoading,
    error: locationDataError,
  } = useFetchLocationsWeatherQuery(location);

  const renderedCurrentIcon = (
    arr: LocationTrip[]
  ): RetrievedLocationTripCast[] => {
    const newArray = arr.map((locationTrip) => {
      return {
        address: locationTrip.address,
        icon: locationTrip.days[0].icon,
        temp: locationTrip.days[0].temp,
        sunriseEpoch: locationTrip.days[0].sunriseEpoch,
        sunsetEpoch: locationTrip.days[0].sunsetEpoch,
      };
    });
    return newArray;
  };

  const retrieveObjectData = (obj: LocationTrip): RetrievedLocationTripCast => {
    return {
      address: obj.address,
      icon: obj.days[0].icon,
      temp: obj.days[0].temp,
      sunriseEpoch: obj.days[0].sunriseEpoch,
      sunsetEpoch: obj.days[0].sunsetEpoch,
    };
  };

  const isLocationCastData = (
    response: LocationTripsCast | LocationTrip
  ): response is LocationTripsCast => {
    return 'locations' in response;
  };

  let tripCast:
    | RetrievedLocationTripCast[]
    | RetrievedLocationTripCast
    | undefined;

  if (locationCastData) {
    if (isLocationCastData(locationCastData)) {
      tripCast = renderedCurrentIcon(locationCastData.locations);
    } else {
      tripCast = retrieveObjectData(locationCastData);
    }
  }

  return (
    <>
      <div className="aside-container">
        <div className='trip-list'>
          {sortedTripsList.length === 0 ? (
            <p className=" trip-list-warning subtitle">
              Nothing found
            </p>
          ) : null}
          {sortedTripsList.map((trip) => {
            let tripWeather;
            if (Array.isArray(tripCast)) {
              tripWeather = tripCast?.find(
                (data) =>
                  trip.name
                    .substring(0, trip.name.indexOf(','))
                    .toLowerCase() ===
                  data.address
                    .substring(0, data.address.indexOf(','))
                    .toLowerCase()
              );
            } else {
              tripWeather = tripCast;
            }

            return (
              <TripCard
                key={trip.id}
                trip={trip}
                tripData={tripWeather}
                error={locationDataError}
                isLoading={isLocationCastLoading}
              />
            );
          })}
        </div>
      </div>
      <div className={`container ${animation}`}>
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
            {!matches ? null : (
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

export default TripsListPage;
