import { ReactNode } from 'react';

import { Trip } from '../store/apis/weatherCastApi/types';

export interface CardAction {
  id: string;
  actionType: 'add' | 'delete';
}

export interface WeatherCastContextProps {
  isHeaderFixed: boolean;
  isFirstVisit: string | null;
  openModalId: string | null;
  cardAction: CardAction | null;
  tripsList: Trip[];
  trip: Trip | null;
  searchTerm: string;
  isContainer: string;
  heightCurrCust: string;

  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetWithSessionStorage: (trip: Trip) => void;
  handleAddTripToLocal: (newTrip: Trip) => void;
  handleDeleteTrip: (id: string) => void;
  handleEditTrip: (id: string, updatedTripDetails: Partial<Trip>) => void;
  toggleModal: (modalId: string) => void;
  setSearchTerm: (value: string) => void;
}
export interface UseWeatherCastProps {
  children: ReactNode;
}