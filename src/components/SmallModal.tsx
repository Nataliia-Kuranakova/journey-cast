import { PropsWithChildren } from 'react';

type SmallModalProps = PropsWithChildren<{
  isSmallModalOpen: boolean;
}>;

const SmallModal = ({
  children,
  isSmallModalOpen,
}: SmallModalProps): JSX.Element => {
  const modalClass = isSmallModalOpen ? 'modal-fade-in' : 'modal-fade-out';

  return <div className={`small-modal ${modalClass}`}>{children}</div>;
};

export default SmallModal;
