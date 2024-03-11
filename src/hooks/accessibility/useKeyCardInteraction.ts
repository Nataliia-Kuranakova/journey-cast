import { useState, KeyboardEvent } from 'react';
import { useWeaterCastContext } from '../../context/WeatherCastContext';

import { useNavigate } from 'react-router-dom';
import { Trip } from '../../store/apis/weatherCastApi/types';

const useKeyCardInteraction = () => {
  const { handleSetWithSessionStorage } = useWeaterCastContext();
  const [isCardFocused, setIsCardFocused] = useState(false);
  const [isShownBtns, setIsShownBtns] = useState(false);
  const navigate = useNavigate();

  const handleCardFocus = () => setIsCardFocused(true);
  const handleCardBlur = () => setIsCardFocused(false);

  const handleClickPathto = (tripPage: string, trip: Trip) => {
    navigate(tripPage);
    handleSetWithSessionStorage(trip);
  };

  const handleTripCardKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    path: string,
    trip: Trip
  ) => {
    if (e.key === 'Enter') {
      handleClickPathto(path, trip);
    }
  };

  const handleEditButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      toggleButtonsVisibility();
    }
  };

  const toggleButtonsVisibility = () => {
    setIsShownBtns((cur) => !cur);
  };

  return {
    isShownBtns,
    isCardFocused,
    handleCardBlur,
    handleCardFocus,
    handleClickPathto,
    handleTripCardKeyDown,
    handleEditButtonKeyDown,
    toggleButtonsVisibility,
  };
};

export default useKeyCardInteraction;
