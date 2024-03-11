import { useWeaterCastContext } from '../context/WeatherCastContext';
import useMediaQuery from '../hooks/useMediaQuery';

import { iconMap } from '../iconMap/iconMap';
import { CurrentDayForecast } from '../store/apis/weatherCastApi/types';

import { IoMdArrowDown } from 'react-icons/io';

interface WeatherForecastProps {
  data: CurrentDayForecast;
}

const WeatherForecast = ({ data }: WeatherForecastProps): JSX.Element => {
  const { heightCurrCust, isHeaderFixed } = useWeaterCastContext();
  const matches = useMediaQuery('(max-width: 425px)');
  const {
    currentConditions: { temp, icon },
    address: city,
  } = data;

  const cityName = city.substring(0, city.indexOf(','));
  const countryName = city.substring(city.length, city.indexOf(',') + 1);

  const shownTitle = !isHeaderFixed ? 'fixed-arrow' : 'none';

  return (
    <>
      <div className={`present-cast ${heightCurrCust}`}>
        <h2 className="present-cast-city title">{cityName}</h2>
        <p className="subtitle">{countryName}</p>
        <div className="present-cast-icon">
          <img src={iconMap[icon]} alt="Weather Icon" />
        </div>
        <h2 className="title present-cast-temperature">
          {Math.floor(temp)}
          <span>&#176;C</span>
        </h2>
        {matches && (
          <div className={shownTitle}>
            <IoMdArrowDown />
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherForecast;
