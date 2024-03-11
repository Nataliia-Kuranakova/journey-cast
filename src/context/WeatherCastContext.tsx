import { useState, createContext, useContext } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSessionStorage } from './hooks/useSessionStorage';
import { useScrollListener } from './hooks/useScrollListener';
import useFirstVisit from './hooks/useFirstVisit';

import { Trip } from '../store/apis/weatherCastApi/types';

import {
  CardAction,
  WeatherCastContextProps,
  UseWeatherCastProps,
} from './types';

import { defaultContextValue } from './const/defaultValue';

const WeatherCastContext =
  createContext<WeatherCastContextProps>(defaultContextValue);

export const useWeaterCastContext = (): WeatherCastContextProps =>
  useContext(WeatherCastContext);

export const AppDataProvider = ({ children }: UseWeatherCastProps) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [cardAction, setCardAction] = useState<CardAction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [tripsList, setTripsList] = useLocalStorage('tripsList', []);
  const [trip, setTrip] = useSessionStorage('selectedTrip', null);
  const [isFirstVisit, setIsFirstVisit] = useFirstVisit('firstVisitDone', null)

  const isHeaderFixed = useScrollListener();

  // console.log('scroll context', isHeaderFixed)

  const handleAddTripToLocal = (newTrip: Trip) => {
    setCardAction({ id: newTrip.id, actionType: 'add' });
    setTripsList([...tripsList, newTrip]);
    setIsFirstVisit('true');
    setTimeout(() => {
      setCardAction(null);
    }, 500);
  };

  const handleDeleteTrip = (id: string) => {
    setCardAction({ id, actionType: 'delete' });
    setTimeout(() => {
      setTripsList(tripsList.filter((trip: Trip) => trip.id !== id));
      setCardAction(null);
    }, 500);
  };

  const handleEditTrip = (id: string, updatedTripDetails: Partial<Trip>) =>
    setTripsList(
      tripsList.map((trip: Trip) =>
        trip.id === id ? { ...trip, ...updatedTripDetails } : trip
      )
    );

  const handleSetWithSessionStorage = (trip: Trip) => setTrip(trip);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
  };

  const toggleModal = (modalId: string) =>
    setOpenModalId(openModalId === modalId ? null : modalId);

  const isContainer = isHeaderFixed ? 'flex' : 'none';
  // console.log('scroll nearest ', scroll);

  const heightCurrCust = isHeaderFixed ? 'height-less' : 'height-more';
  

  return (
    <WeatherCastContext.Provider
      value={{
        trip,
        tripsList,
        cardAction,
        searchTerm,
        openModalId,
        isFirstVisit,
        isHeaderFixed,
        isContainer,
        heightCurrCust,
        setSearchTerm,
        toggleModal,
        handleEditTrip,
        handleDeleteTrip,
        handleSearchInput,
        handleAddTripToLocal,
        handleSetWithSessionStorage,
      }}
    >
      {children}
    </WeatherCastContext.Provider>
  );
};
