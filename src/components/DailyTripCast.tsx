import { useRef } from 'react';
import { useScrollByKey } from '../hooks/accessibility/useScrollByKey';
import {
  TripCast,
  DayForecast,
  Trip,
} from '../store/apis/weatherCastApi/types';

import DailyCastCard from './DailyCastCard';
import { useWeaterCastContext } from '../context/WeatherCastContext';

interface DailyTripCastProps {
  data: TripCast | undefined;
  tripDates: Trip | null;
  scroll?: boolean;
}

const DailyTripCast = ({
  data,
  tripDates,
}: DailyTripCastProps): JSX.Element => {
  const { tripsList } = useWeaterCastContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown } = useScrollByKey(scrollContainerRef);

  const renderedTripsLIstCast = (arr: DayForecast[]) => {
    return arr.map((day) => {
      return <DailyCastCard key={day.datetime} day={day} />;
    });
  };

  let content;

  if (data) {
    content = renderedTripsLIstCast(data.days);
  }

  return (
    <>
      {tripsList.length !== 0 ? (
        <section className="daily-trip-cast">
          <p className={` subtitle `}>Trip Forecast</p>
          <p className="content">
            {' '}
            <span>
              {tripDates?.start.split('-').reverse().join('.').slice(0, -5)} -{' '}
              {tripDates?.end.split('-').reverse().join('.').slice(0, -5)}
            </span>
          </p>

          <div
            className="daily-trip-cast-container "
            ref={scrollContainerRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Daily trip forecast scrollable list"
          >
            {content}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default DailyTripCast;
