import { WeatherCastContextProps } from '../types';

export const defaultContextValue: WeatherCastContextProps = {
  isHeaderFixed: false,
  isFirstVisit: null,
  openModalId: null,
  cardAction: null,
  tripsList: [],
  trip: null,
  searchTerm: '',
  isContainer: '',
  heightCurrCust: '',

  handleSearchInput: () => {},
  handleSetWithSessionStorage: () => {},
  handleAddTripToLocal: () => {},
  handleDeleteTrip: () => {},
  handleEditTrip: () => {},
  toggleModal: () => {},
  setSearchTerm: () => {},
};
