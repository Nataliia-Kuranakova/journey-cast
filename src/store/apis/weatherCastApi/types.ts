export interface Trip {
  id: string;
  name: string;
  start: string;
  end: string;
}

export interface TripCity {
  name: string;
}

export interface CurrentDayForecast {
  resolvedAddress: string;
  address: string;
  description: string;
  currentConditions: {
    temp: number;
    humidity: number;
    windgust: number;
    windspeed: number;
    visibility: number;
    uvindex: number;
    icon: string;
    sunrise: string;
    sunset: string;
    sunriseEpoch: number;
    sunsetEpoch: number;
  };
}

export interface DayForecast {
  datetime: string;
  tempmax: number;
  tempmin: number;
  icon: string;
}

export interface TripCast {
  days: DayForecast[];
}

export interface DetailedCastData {
  uvindex: number;
  humidity: number;
  visibility: number;
  sunrise: string;
  sunset: string;
}

export interface Day {
  temp: number;
  icon: string;
  sunriseEpoch: number;
  sunsetEpoch: number;
}

export interface LocationData {
  name: string;
  currentDate: string;
}

export interface LocationTrip {
  address: string;
  days: Day[];
}

export interface LocationTripsCast {
  locations: LocationTrip[];
}

export interface RetrievedLocationTripCast {
  address: string;
  icon: string;
  temp: number;
  sunriseEpoch: number;
  sunsetEpoch: number;
}
