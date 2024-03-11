import { useState, useEffect } from 'react';
import { Trip } from '../store/apis/weatherCastApi/types';

const useExpiredTripBg = (trip: Trip) => {
  const { start, end } = trip;

  const [tripMark, setTripMark] = useState<string | null>(null);

  useEffect(() => {
    let now = new Date().toJSON().slice(0, 10);

    if (start <= now && now <= end) {
      setTripMark('');
    } else if (now > end) {
      setTripMark('expired-trip');
    } else {
      setTripMark(null);
    }
  }, [start, end]);

  return tripMark;
};

export default useExpiredTripBg;
