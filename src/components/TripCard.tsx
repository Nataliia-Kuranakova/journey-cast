import { useState, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import useExpiredTripBg from '../hooks/useExpiredTripBg';
import useDelayAnimation from '../hooks/useDelayAnimation';
import useKeyCardInteraction from '../hooks/accessibility/useKeyCardInteraction';
import {
  Trip,
  RetrievedLocationTripCast,
} from '../store/apis/weatherCastApi/types';
import { tripsListPath } from '../consts/paths';

import { MdOutlineModeEdit } from 'react-icons/md';

import Form from './Form';
import Modal from './Modal';
import Buttons from './Buttons';
import SmallModal from './SmallModal';
import DeleteConfirmation from './DeleteConfirmation';
import TripCardEditBtns from './TripCardEditBtns';
import TripCardContent from './TripCardContent';

interface TripCardProps {
  trip: Trip;
  tripData?: RetrievedLocationTripCast;
  isLoading?: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

const TripCard = ({
  trip,
  error,
  isLoading,
  tripData = {
    icon: 'default-icon',
    temp: 0,
    address: 'City Name',
    sunriseEpoch: 0,
    sunsetEpoch: 0,
  },
}: TripCardProps): JSX.Element => {
  const [isFirstRender, setIsFirstRender] = useState('data-fade-in');
  const tripMark = useExpiredTripBg(trip)

  const { cardAction, openModalId, toggleModal, handleEditTrip } =
    useWeaterCastContext();

  const modalId = `edit/${trip.id}`;
  const isModalOpen = openModalId === modalId;
  const shouldRenderModal = useDelayAnimation(isModalOpen, 300);

  const smallModalId = trip.id;
  const isSmallModalOpen = openModalId === smallModalId;
  const shouldRenderSmallModal = useDelayAnimation(isSmallModalOpen, 300);

  const {
    isShownBtns,
    isCardFocused,
    handleCardFocus,
    handleCardBlur,
    handleTripCardKeyDown,
    handleEditButtonKeyDown,
    handleClickPathto,
    toggleButtonsVisibility,
  } = useKeyCardInteraction();

  useEffect(() => {
    if (isShownBtns) {
      setIsFirstRender('shrink-in');
    } else if (!isShownBtns && isFirstRender !== 'data-fade-in') {
      setIsFirstRender('shrink-out');
    }
  }, [isShownBtns, isFirstRender]);

  const handleSnownBtns = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toggleButtonsVisibility();
  };

  const handleCloseSmallModal = (id: string) => {
    toggleModal(id);
    toggleButtonsVisibility();
  };

  const handleEditClick = (id: string, updatedTrip: Partial<Trip>) => {
    handleEditTrip(id, updatedTrip);
    toggleModal(modalId);
    toggleButtonsVisibility();
  };

  const deleteConfirmation = (
    <SmallModal isSmallModalOpen={isSmallModalOpen}>
      <DeleteConfirmation smallModalId={smallModalId} trip={trip} />
    </SmallModal>
  );

  const { icon, temp } = tripData;

  const cardActionAnimation =
    trip.id === cardAction?.id
      ? cardAction.actionType === 'add'
        ? 'card-in'
        : 'card-out'
      : '';

  return (
    <>
      <div className={`trip-wrapper ${isFirstRender}`}>
        <div
          tabIndex={0}
          className={`trip ${tripMark} ${
            isCardFocused ? 'focused' : ''
          } ${cardActionAnimation}`}
          onClick={() => handleClickPathto(`${tripsListPath}/${trip.name}`, trip)}
          onKeyDown={(e) =>
            handleTripCardKeyDown(e, `${tripsListPath}/${trip.name}`, trip)
          }
          onFocus={handleCardFocus}
          onBlur={handleCardBlur}
        >
          <TripCardContent
            isLoading={isLoading}
            error={error}
            icon={icon}
            temp={temp}
            trip={trip}
          />
          <div className="trip-edit-btn">
            <Buttons
              type="button"
              onClick={(e) => handleSnownBtns(e)}
              onKeyDown={handleEditButtonKeyDown}
            >
              {/* <CiEdit size={'30px'} /> */}
              <MdOutlineModeEdit size={'30px'} />
            </Buttons>
          </div>
        </div>

        {isShownBtns && (
          <TripCardEditBtns
            id={smallModalId}
            tripId={trip.id}
            trip={trip}
            onClose={() => handleCloseSmallModal(smallModalId)}
            onEdit={() => handleEditClick(trip.id, trip)}
          />
        )}
        {shouldRenderSmallModal && deleteConfirmation}
      </div>

      {shouldRenderModal && (
        <Modal isModalOpen={isModalOpen}>
          <Form trip={trip} modalId={modalId} />
        </Modal>
      )}
    </>
  );
};

export default TripCard;
