import { useWeaterCastContext } from '../context/WeatherCastContext';

import Buttons from './Buttons';
import { AiOutlinePlus } from 'react-icons/ai';

const EmptyTripsListMsg = () => {
  const { toggleModal } = useWeaterCastContext();
  const modalId = 'add';
  return (
    <div className="empty-trips-list-msg">
      <div className="empty-trips-list-msg-title">
        Plan the first trip
        <div className="slide-btn">
          <Buttons
            aditionalStyles="button-gradient"
            type="button"
            onClick={() => toggleModal(modalId)}
          >
            <AiOutlinePlus color="white" />
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default EmptyTripsListMsg;
