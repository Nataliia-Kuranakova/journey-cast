import { useWeaterCastContext } from '../context/WeatherCastContext';
import { Trip } from '../store/apis/weatherCastApi/types';

import Buttons from './Buttons';

interface DeleteConfirmationProps {
  trip: Trip;
  smallModalId: string;
}

const DeleteConfirmation = ({
  trip,
  smallModalId,
}: DeleteConfirmationProps) => {
  const { handleDeleteTrip, toggleModal } = useWeaterCastContext();
  const handleDeleteCard = (id: string) => {
    toggleModal(id);
    setTimeout(() => {
      handleDeleteTrip(id);
    }, 400);
  };
  return (
    <div className="delete-confirmation">
      <p className="card-title ">Do you want to delete the trip?</p>
      <div className="delete-confirmation-btns-wrapper">
        <Buttons
          aditionalStyles="button-bg button-bg--delete"
          type="button"
          onClick={() => toggleModal(smallModalId)}
        >
          No
        </Buttons>
        <Buttons
          aditionalStyles="button-bg button-bg--edit"
          type="button"
          onClick={() => handleDeleteCard(trip.id)}
        >
          Yes
        </Buttons>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
