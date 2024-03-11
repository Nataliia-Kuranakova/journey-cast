import { MdEditNote } from 'react-icons/md';
import { MdDeleteSweep } from 'react-icons/md';
import { Trip } from '../store/apis/weatherCastApi/types';

import Buttons from './Buttons';

interface TripCardEditBtnsProps {
  id: string;
  tripId: string;
  trip: Trip;
  onClose: (id: string) => void;
  onEdit: (tripId: string, trip: Trip) => void;
}

const TripCardEditBtns = ({
  id,
  tripId,
  trip,
  onClose,
  onEdit,
}: TripCardEditBtnsProps): JSX.Element => {
  return (
    <div className={`trip-edit-btns`}>
      <Buttons
        type="button"
        onClick={() => onClose(id)}
        aditionalStyles="button-bg button-bg--delete"
      >
        <MdDeleteSweep size={'30px'} />
      </Buttons>
      <Buttons
        type="button"
        onClick={() => onEdit(tripId, trip)}
        aditionalStyles="button-bg button-bg--edit"
      >
        <MdEditNote size={'30px'} />
      </Buttons>
    </div>
  );
};

export default TripCardEditBtns;
