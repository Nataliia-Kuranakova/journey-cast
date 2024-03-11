import { forwardRef } from 'react';

import { IoMdCalendar } from 'react-icons/io';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';

import Buttons from './Buttons';

interface FormInputProps {
  inputValue: string;
  label: string;
  type: string;
  name: string;
  value: string;
  dateInput: boolean;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      inputValue,
      label,
      type,
      name,
      value,
      onClick,
      onChange,
      onKeyDown,
      dateInput,
      autoComplete,
    },
    ref
  ): JSX.Element => {
    const cityNameInputIcon =
      inputValue !== '' ? (
        <Buttons onClick={onClick}>
          <IoMdCloseCircleOutline />
        </Buttons>
      ) : (
        <RiArrowDownSFill />
      );

    const inputIcon = dateInput ? <IoMdCalendar /> : cityNameInputIcon;
    return (
      <div className="form-input-container">
        <label>{label} </label>
        <div className="form-input-wrapper">
          <div className="form-input-icon">{inputIcon}</div>
          <input
            ref={ref}
            className="form-input"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            autoComplete={autoComplete}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    );
  }
);

export default FormInput;
