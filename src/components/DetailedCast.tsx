import { createCardData } from '../utils/DetailedCastUtils';
import { CurrentDayForecast } from '../store/apis/weatherCastApi/types';

import { PiWind } from 'react-icons/pi';

import DetailedCastCard from './DetailedCastCard';

interface DetailedCastProps {
  data: CurrentDayForecast;
}

const DetailedCast = ({ data }: DetailedCastProps): JSX.Element => {
  const {
    currentConditions: { windspeed, windgust },
    address: city,
  } = data;

  const { currentConditions } = data;

  const cardData = createCardData(currentConditions);

  const cityName = city.substring(0, city.indexOf(','));

  return (
    <section className="detailed-cast">
      <p className="detailed-cast-title subtitle">Now in {cityName}</p>
      <div className="detailed-cast-list-data">
        <div className="wind">
          <h5 className=" card-title">Wind</h5>
          <div className="wind-content-wrapper">
            <div className="wind-dscr">
              <p className="detailed-cast-dinamic-data content">
                <span>Wind</span>
                {Math.round(windspeed)} <span>k/h</span> {'   '}
              </p>
              <p className="detailed-cast-dinamic-data content">
                <span>Gusts</span> {Math.round(windgust)} k/h{' '}
              </p>
            </div>
            <div>
              <PiWind />
            </div>
          </div>
        </div>
        {cardData.map((card) => {
          return <DetailedCastCard key={card.title} card={card} />;
        })}
      </div>
    </section>
  );
};

export default DetailedCast;
