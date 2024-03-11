import { useEffect } from 'react';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import { useAutoFocusAndKeyboardNavigation } from '../hooks/accessibility/useAutoFocusAndKeyboardNavigation';
import useDelayAnimation from '../hooks/useDelayAnimation';
import useForm from '../hooks/useForm';

import { Trip } from '../store/apis/weatherCastApi/types';

import Buttons from './Buttons';
import FormInput from './FormInput';
import Autocomplete from './Autocomplete';

interface FormProps {
  modalId: string;
  trip?: Trip;
}

const Form = ({ trip, modalId }: FormProps) => {
  const { handleEditTrip, openModalId, toggleModal } = useWeaterCastContext();

  const initialValue = trip
    ? { ...trip }
    : { name: '', start: '', end: '', id: '' };

  const {
    data,
    isBusy,
    inputValue,
    correctSpelling,
    handleSubmit,
    setInputValue,
    handleCorrectSpelling,
    handleClearAutocomlete,
    handleAutocompleteData,
    handleInputValueChange,
  } = useForm(initialValue);

  const isModalOpen = openModalId === modalId;

  const shouldRenderAutocomplete = useDelayAnimation(isBusy, 300);

  const { inputRef, autocompleteRef, handleInputKeyDown } =
    useAutoFocusAndKeyboardNavigation({
      isModalOpen,
      dataLength: data?.geonames?.length || 0,
    });

  useEffect(() => {
    if (trip) {
      handleCorrectSpelling(trip.name);
    }
  });

  const handleSubmitTrip = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event);
    setInputValue(initialValue);
    toggleModal(modalId);
  };

  const handleChangeTrip = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (trip && correctSpelling === inputValue.name) {
      handleEditTrip(trip.id, inputValue);
      toggleModal(modalId);
    } else {
      setInputValue({ ...initialValue, name: inputValue.name });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmitTrip}>
      <FormInput
        ref={inputRef}
        inputValue={inputValue.name}
        dateInput={false}
        label="Enter the city"
        type="text"
        name="name"
        value={inputValue.name}
        onChange={handleInputValueChange}
        onClick={handleClearAutocomlete}
        autoComplete="off"
        onKeyDown={handleInputKeyDown}
      />
      <div ref={autocompleteRef} className="autocomplete-wrapper">
        {shouldRenderAutocomplete && data && (
          <Autocomplete
            data={data}
            isAutocomplete={isBusy}
            onCorrectSpelling={handleCorrectSpelling}
            onAutocompleteData={handleAutocompleteData}
          />
        )}
      </div>

      <FormInput
        inputValue=""
        dateInput
        label="Enter start date"
        type="date"
        name="start"
        value={inputValue.start}
        onChange={handleInputValueChange}
      />

      <FormInput
        inputValue=""
        dateInput
        label="Enter end date"
        type="date"
        name="end"
        value={inputValue.end}
        onChange={handleInputValueChange}
      />
      <div className="form-buttons">
        <Buttons
          aditionalStyles="button-border"
          type="button"
          border
          onClick={() => toggleModal(modalId)}
        >
          Cancel
        </Buttons>
        {trip ? (
          <Buttons
            aditionalStyles="button-border"
            type="button"
            border
            onClick={(event) => handleChangeTrip(event)}
          >
            Save
          </Buttons>
        ) : (
          <Buttons aditionalStyles="button-border" type="submit" border>
            Add
          </Buttons>
        )}
      </div>
    </form>
  );
};

export default Form;
