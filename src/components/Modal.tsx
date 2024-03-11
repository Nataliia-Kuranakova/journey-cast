import ReactDOM from 'react-dom';
import { PropsWithChildren, useEffect } from 'react';
import { useWeaterCastContext } from '../context/WeatherCastContext';

type ModalProps = PropsWithChildren<{
  isModalOpen: boolean;
}>;

const Modal = ({ children, isModalOpen }: ModalProps): JSX.Element => {
  const { tripsList, isFirstVisit } = useWeaterCastContext();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const modalClass = isModalOpen ? 'modal-fade-in' : 'modal-fade-out';

  const backdrop =
    isFirstVisit === null || tripsList.length === 0
      ? 'modal-backdrop-first-visit '
      : '';
  const content =
    isFirstVisit === null || tripsList.length === 0
      ? 'modal-content-first-visit'
      : '';

  return ReactDOM.createPortal(
    <div className={`modal-backdrop ${backdrop} ${modalClass}`}>
      <div className={`modal-content ${content}`}>{children}</div>
    </div>,
    document.querySelector('.modal-container') as Element
  );
};

export default Modal;
