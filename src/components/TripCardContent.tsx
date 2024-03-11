import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { iconMap } from '../iconMap/iconMap';

import { Trip } from '../store/apis/weatherCastApi/types';

import Spinner from './Spinner';
import ErrorStatusMessage from './ErrorStatusMessage';

interface TripCardIconProps {
  isLoading: boolean | undefined;
  error?: FetchBaseQueryError | SerializedError | undefined;
  icon: string;
  temp: number;
  trip: Trip;
}

const TripCardContent = ({
  isLoading,
  error,
  icon,
  temp,
  trip,
}: TripCardIconProps): JSX.Element => {
  const { start, end } = trip;
  const cityName = trip.name.substring(0, trip.name.indexOf(','));
  const countryName = trip.name.substring(
    trip.name.length,
    trip.name.indexOf(',') + 1
  );

  return (
    <>
      <div className="trip-city">
        <h3 className="trip-city-name subtitle">
          {cityName}
          <p className="content card-title">{countryName}</p>
        </h3>

        <p className="trip-card-date">
          {start.split('-').reverse().join('.')} -{' '}
          {end.split('-').reverse().join('.')}
        </p>
      </div>
      <div className="trip-cur-weather-cust">
        <p className="content card-title">{error ? '' : 'Today'}</p>
        {isLoading ? (
          <Spinner sprinnerStyles="card-spinner" iconSize="50px" />
        ) : error ? (
          <ErrorStatusMessage
            error={error}
            classNameError="trip-card-error"
            classNameIcon="trip-card-error-icon"
            classNameText="card-title"
          />
        ) : (
          <div className="trip-cur-weather-cust-icon">
            <img src={iconMap[icon]} alt={iconMap[icon]} />
            <div className="trip-cur-weather-cust-temp content">
              {Math.round(temp)} <span>&#176;c</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TripCardContent;
