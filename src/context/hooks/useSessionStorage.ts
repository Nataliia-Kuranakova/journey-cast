import { useState, useEffect } from 'react';
import { Trip } from '../../store/apis/weatherCastApi/types'; // adjust path as necessary

export function useSessionStorage(key: string, initialValue: Trip | null) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

/// previous code in context

// const [trip, setTrip] = useState<Trip | null>(null);

// useEffect(() => {
  //   if (trip === null) {
  //     const storedTrip = sessionStorage.getItem('selectedTrip');
  //     if (storedTrip) {
  //       setTrip(JSON.parse(storedTrip));
  //     }
  //   }
  // }, [trip]);


// const handleSetWithSessionStorage = (trip: Trip) => {
  //   // console.log('trip context ', trip)
  //   setTrip(trip);
  //   sessionStorage.setItem('selectedTrip', JSON.stringify(trip));
  // };