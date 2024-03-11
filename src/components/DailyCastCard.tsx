import { iconMap } from '../iconMap/iconMap';
import { DayForecast } from '../store/apis/weatherCastApi/types';
import { weekDay } from '../consts/week-days';

interface DailyCastCardProps {
  day: DayForecast;
}

const DailyCastCard = ({ day }: DailyCastCardProps): JSX.Element => {
  const dayOfWeek = new Date(day.datetime);
  const certDay = weekDay[dayOfWeek.getDay()];
  return (
    <div className="daily-trip-cast-card">
      <p className="daily-trip-cast-card-day content">{certDay}</p>
      <div className="daily-trip-cast-card-icon">
        <img src={iconMap[day.icon]} alt="Icon" />
      </div>
      <div className="daily-trip-cast-card-temperature">
        <p className="daily-trip-cast-card-maxT ">
          {Math.floor(day.tempmax)}
          <span>&#176;c</span>
        </p>
        <p className="daily-trip-cast-card-minT ">
          {Math.floor(day.tempmin)}
          <span>&#176;c</span>
        </p>
      </div>
    </div>
  );
};

export default DailyCastCard;
