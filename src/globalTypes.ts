export interface CardContent {
  title: string;
  icon: JSX.Element;
  data: number | string;
  extraData?: string;
  className: string;
  extraIcon?: JSX.Element;
  isSpecial?: boolean;
}

// export type Overcast =
//   | 'partly-cloudy-day'
//   | 'rain-snow-showers-day'
//   | 'rain-snow-showers-night'
//   | 'showers-day'
//   | 'showers-night'
//   | 'snow-showers-day'
//   | 'snow-showers-night'
//   | 'thunder-rain'
//   | 'thunder-showers-day'
//   | 'thunder-showers-night'
//   | 'cloudy'
//   | 'fog'
//   | 'hail'
//   | 'rain'
//   | 'sleet'
//   | 'snow'
//   | 'thunder'
//   | 'wind';

// export type Clear =
//   | 'clear-day'
//   | 'clear-night'
//   | 'partly-cloudy-day'
//   | 'partly-cloudy-night';

// export type WeatherCondition = Overcast | Clear;

export interface WeatherData {
  condition: string;
  sunriseEpoch: number;
  sunsetEpoch: number;
  currentTimeEpoch: number;
}

export interface BackgroundStyle {
  backgroundGradient: string;
  backgroundSize: string;
}

export interface IconsMap {
  [key: string]: string;
}
