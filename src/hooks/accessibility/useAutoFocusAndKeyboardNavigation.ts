import { useEffect, useRef } from 'react';

interface UseAutoFocusAndKeyboardNavigationProps {
  isModalOpen: boolean;
  dataLength: number;
}

export const useAutoFocusAndKeyboardNavigation = ({
  isModalOpen,
  dataLength,
}: UseAutoFocusAndKeyboardNavigationProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && dataLength > 0) {
      event.preventDefault();
      autocompleteRef.current?.querySelector('li')?.focus();
    }
  };

  return { inputRef, autocompleteRef, handleInputKeyDown };
};
