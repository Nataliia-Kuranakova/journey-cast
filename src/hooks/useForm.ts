import { useState } from 'react';
import { Trip } from '../store/apis/weatherCastApi/types';
import { nanoid } from '@reduxjs/toolkit';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import { useLazyFetchCityQuery } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from './useDebounce';
import { tripsListPath } from '../consts/paths';

const useForm = (initialValue: Trip) => {
  const [isBusy, setBusy] = useState(false);

  const [correctSpelling, setCorrectSpelling] = useState('');

  const [inputValue, setInputValue] = useState(initialValue);
  const [fetchCity, { data, isLoading, error }] = useLazyFetchCityQuery();
  const { handleAddTripToLocal } = useWeaterCastContext();
  const debouncedFetchCity = useDebounce(fetchCity, 300);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log('spelling ', correctSpelling);

  const { name, start, end } = inputValue;

  const handleCorrectSpelling = (fullName: string) => {
    setCorrectSpelling(fullName);
  };

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.name === 'name') {
      setBusy(true);
    }

    const updatedValue = {
      ...inputValue,
      [event.target.name]: event.target.value,
    };

    setInputValue(updatedValue);

    if (event.target.name === 'name' && updatedValue.name !== '') {
      debouncedFetchCity(updatedValue.name);
    }

    if (updatedValue.name === '') {
      setBusy(false);
    }
  };

  const handleAutocompleteData = (cityName: string, countryName: string) => {
    const fullName = `${cityName}, ${countryName}`;
    setInputValue({ ...inputValue, name: fullName });
    setBusy(false);
  };

  const handleClearAutocomlete = () => {
    setInputValue({ ...inputValue, name: '' });
    setBusy(false);
  };

  const addedTrip = {
    id: nanoid(),
    name,
    start,
    end,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (correctSpelling === inputValue.name) {
      handleAddTripToLocal(addedTrip);
      setCorrectSpelling('');
    } else {
      setInputValue(inputValue);
    }
    if (location.pathname !== tripsListPath) {
      navigate(tripsListPath);
    }
  };

  return {
    data,
    error,
    isBusy,
    isLoading,
    inputValue,
    correctSpelling,
    handleSubmit,
    setInputValue,
    setCorrectSpelling,
    handleAutocompleteData,
    handleClearAutocomlete,
    handleInputValueChange,
    handleCorrectSpelling,
  };
};

export default useForm;
