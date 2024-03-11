import { useState, useEffect } from 'react';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import useDelayAnimation from '../hooks/useDelayAnimation';

import { AiOutlinePlus } from 'react-icons/ai';

import Form from './Form';
import Modal from './Modal';
import Buttons from './Buttons';

const Slider = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { toggleModal, openModalId } = useWeaterCastContext();
  const modalId = 'add';
  const isModalOpen = openModalId === modalId;
  const shouldRenderModal = useDelayAnimation(isModalOpen, 300);

  const slides = [
    'Welcome to the JourneyCast!',
    <div>Plan the trip</div>,
    <div>&</div>,
    <div>Track the weather</div>,
    <div>
      {'Create the first trip'}
      <div className="slide-btn">
        <Buttons
          aditionalStyles="button-gradient"
          type="button"
          onClick={() => toggleModal(modalId)}
        >
          <AiOutlinePlus color="white" />
        </Buttons>
      </div>
    </div>,
  ];

  const modal = (
    <Modal isModalOpen={isModalOpen}>
      <Form modalId={modalId} />
    </Modal>
  );

  useEffect(() => {
    if (currentSlide < slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, slides.length]);

  return (
    <>
      <div className="slide-container">
        {slides.map((slide, index) => (
          <div
            className="slide slide-title"
            key={index}
            style={{
              display: index === currentSlide ? 'flex' : 'none',
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      {shouldRenderModal && modal}
    </>
  );
};

export default Slider;
