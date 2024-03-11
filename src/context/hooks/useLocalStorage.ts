import { useState, useEffect } from 'react';
import { Trip } from '../../store/apis/weatherCastApi/types'; 

export function useLocalStorage(key: string, initialValue: Trip[]) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

////localStorage previous logic code

// const [tripsList, setTripsList] = useState<Trip[]>(() => {
  //   const localData = localStorage.getItem('tripsList');

  //   if (localData && localData !== undefined) {
  //     const parsedData = JSON.parse(localData);

  //     return parsedData;
  //   }
  //   return [];
  // });

  // useEffect(() => {
  //   localStorage.setItem('tripsList', JSON.stringify(tripsList));
  // }, [tripsList]);

  // const handleAddTripToLocal = (newTrip: Trip) => {
  //   setCardAction({ id: newTrip.id, actionType: 'add' });
  //   setTripsList((prevTrip) => [...prevTrip, newTrip]);
  //   setTimeout(() => {
  //     setCardAction(null);
  //   }, 500);
  // };

  // const handleDeleteTrip = (id: string) => {
  //   setCardAction({ id, actionType: 'delete' });
  //   setTimeout(() => {
  //     setTripsList((prevTrip) => {
  //       const updatedTripsList = prevTrip.filter((trip) => trip.id !== id);
  //       localStorage.setItem('tripsList', JSON.stringify(updatedTripsList));
  //       setCardAction(null);
  //       return updatedTripsList;
  //     });
  //   }, 500);
  // };

  // const handleEditTrip = (id: string, updatedTripDetails: Partial<Trip>) => {
  //   setTripsList((prevTrips) => {
  //     const updatedTrip = prevTrips.map((trip) => {
  //       if (trip.id === id) {
  //         return { ...trip, ...updatedTripDetails };
  //       }
  //       return trip;
  //     });
  //     localStorage.setItem('tripsList', JSON.stringify(updatedTrip));
  //     return updatedTrip;
  //   });
  // };