import { useRef, KeyboardEvent } from 'react';

export interface UseKeyboardNavigationProps {
  itemCount: number;
  onItemSelect: (index: number) => void;
}

export const useKeyboardNavigation = ({ itemCount, onItemSelect }: UseKeyboardNavigationProps) => {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      onItemSelect(index);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      let newIndex = index + (e.key === 'ArrowDown' ? 1 : -1);
      newIndex = Math.max(0, Math.min(newIndex, itemCount - 1));
      focusItem(newIndex);
    }
  };

  return { itemRefs, handleKeyDown };
};