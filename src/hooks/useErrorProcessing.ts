import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const useErrorProcessing = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  let errorMessage = 'An unexpected error occurred. Please try again later.';

  if (error) {
    if ('status' in error) {
      switch (true) {
        case error.status === 'FETCH_ERROR':
          errorMessage =
            'Unable to connect. Please check your internet connection and try again.';
          break;
        case error.status === 'PARSING_ERROR':
          errorMessage =
            'We had trouble understanding the response. Please try again later.';
          break;
        case typeof error.status === 'number' && error.status === 404:
          errorMessage =
            'The item you are looking for does not exist. It may have been moved or deleted.';
          break;
        default:
          errorMessage = 'Something went wrong. Please try again.';
          break;
      }
    } else if ('message' in error) {
      errorMessage = error.message || errorMessage;
    }
  }

  return { errorMessage };
};

export default useErrorProcessing;