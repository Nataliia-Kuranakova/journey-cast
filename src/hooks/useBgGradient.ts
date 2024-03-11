import { useEffect } from 'react';
import { cloudy, clear } from '../consts/icons-bg';
import { WeatherData, BackgroundStyle } from '../globalTypes';
import { CurrentDayForecast } from '../store/apis/weatherCastApi/types';

const useBgGradient = (
  tripCurrentCastData: CurrentDayForecast,
  isLoading: boolean
) => {
  const currWeather = tripCurrentCastData?.currentConditions!;

  const { icon, sunriseEpoch, sunsetEpoch } = currWeather || {};

  const currentTimeEpoch = new Date().getTime() / 1000;

  const determineBackgroundGradient = ({
    condition,
    sunriseEpoch,
    sunsetEpoch,
    currentTimeEpoch,
  }: WeatherData): BackgroundStyle => {
    const isDayTime =
      currentTimeEpoch >= sunriseEpoch && currentTimeEpoch <= sunsetEpoch;
    let backgroundGradient = '';
    let backgroundSize = '';

    switch (condition) {
      case cloudy[condition]:
        backgroundGradient = isDayTime
          ? 'linear-gradient(180deg, rgb(107, 123, 150), rgb(0 0 0))'
          : 'linear-gradient(180deg, rgb(18 24 49), rgb(155 151 163))';
        backgroundSize = '100% 400%';
        break;
      case clear[condition]:
        backgroundGradient = isDayTime
          ? 'linear-gradient(180deg, #5976b0, #f1c017)'
          : 'linear-gradient(180deg, rgb(17 26 59), #74629e)';
        backgroundSize = '100% 400%';

        break;
      default:
        backgroundGradient = 'linear-gradient(180deg, #202a55, #74629e';
        backgroundSize = '200% 250%';
        break;
    }

    return {
      backgroundGradient,
      backgroundSize,
    };
  };

  useEffect(() => {
    const weatherData: WeatherData = {
      condition: icon,
      sunriseEpoch: sunriseEpoch || 0,
      sunsetEpoch: sunsetEpoch || 0,
      currentTimeEpoch,
    };

    if (isLoading) {
      document.body.style.backgroundImage =
        'linear-gradient(180deg, #202a55, #74629e';
      document.body.style.backgroundSize = '200% 250%';
    }

    const { backgroundGradient, backgroundSize } =
      determineBackgroundGradient(weatherData);

    document.body.style.backgroundImage = backgroundGradient;
    document.body.style.backgroundSize = backgroundSize;

    return () => {
      document.body.style.backgroundImage =
        'linear-gradient(180deg, #202a55, #74629e';
      document.body.style.backgroundSize = '200% 250%';
    };
  }, [icon, sunriseEpoch, sunsetEpoch, currentTimeEpoch, isLoading]);

  return useBgGradient;
};

export default useBgGradient;
