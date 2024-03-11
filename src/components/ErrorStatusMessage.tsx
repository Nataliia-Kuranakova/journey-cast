import { FetchBaseQueryError } from '@reduxjs/toolkit/query'; // Import types
import { SerializedError } from '@reduxjs/toolkit';
import useErrorProcessing from '../hooks/useErrorProcessing';

import { HiEmojiSad } from 'react-icons/hi';

type ErrorStatusMessageProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  classNameError?: string;
  classNameIcon?: string;
  classNameText?: string;
};

const ErrorStatusMessage = ({
  error,
  classNameError,
  classNameIcon,
  classNameText,
}: ErrorStatusMessageProps): JSX.Element => {
  const { errorMessage } = useErrorProcessing(error);
  return (
    <div className={classNameError}>
      <div className={classNameIcon}>
        <HiEmojiSad />
      </div>
      <p className={classNameText}>{errorMessage}</p>
    </div>
  );
};


export default ErrorStatusMessage;