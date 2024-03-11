import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import useDelayAnimation from '../hooks/useDelayAnimation';

import { PiList } from 'react-icons/pi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { HiOutlineMagnifyingGlassCircle } from 'react-icons/hi2';

import Form from './Form';
import Modal from './Modal';
import Buttons from './Buttons';
import SearchInput from './SearchInput';

const NavBar = (): JSX.Element => {
  const [isSearchInputMounted, setIsisSearchInputMounted] = useState(false);
  const shouldRenderInput = useDelayAnimation(isSearchInputMounted, 300);

  const { tripsList, isHeaderFixed, openModalId, toggleModal, setSearchTerm } =
    useWeaterCastContext();
  const modalId = 'add';
  const isModalOpen = openModalId === modalId;
  const shouldRenderModal = useDelayAnimation(isModalOpen, 300);

  const navigate = useNavigate();

  useEffect(() => {
    if (tripsList.length === 0) {
      navigate('/');
    }
  }, [tripsList.length, navigate]);

  const modal = (
    <Modal isModalOpen={isModalOpen}>
      <Form modalId={modalId} />
    </Modal>
  );

  const toggleSearchInput = () => {
    setSearchTerm('');
    setIsisSearchInputMounted(!isSearchInputMounted);
  };

  const location = useLocation();

  const navigationButton =
    location.pathname !== '/trips' ? (
      <Link to="trips">
        <Buttons>
          <PiList color="white" />
        </Buttons>
      </Link>
    ) : (
      <>
        <Buttons onClick={toggleSearchInput}>
          <HiOutlineMagnifyingGlassCircle />
        </Buttons>
        {shouldRenderInput && (
          <SearchInput
            isSearchInput={shouldRenderInput}
            isMounted={isSearchInputMounted}
          />
        )}
      </>
    );

  return (
    <>
      <header className={`header ${isHeaderFixed ? ' fixed' : ''}`}>
        <nav className="nav">
          {tripsList.length !== 0 ? navigationButton : <div></div>}
          <Buttons type="button" onClick={() => toggleModal(modalId)}>
            <IoAddCircleOutline color="white" />
          </Buttons>
        </nav>
      </header>
      {shouldRenderModal && modal}
    </>
  );
};

export default NavBar;
