import { PropsWithChildren, MouseEvent } from 'react';

type ButtonsProps = PropsWithChildren<{
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  border?: boolean;
  aditionalStyles?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}>;

const Buttons = ({
  children,
  onClick,
  border,
  type,
  onKeyDown,
  aditionalStyles,
}: ButtonsProps): JSX.Element => {
  return (
    <button
      type={type}
      className={`button ${aditionalStyles}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
};

export default Buttons;
