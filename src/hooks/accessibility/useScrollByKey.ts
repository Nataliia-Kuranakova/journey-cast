import { RefObject, KeyboardEvent } from 'react';

export const useScrollByKey = (ref: RefObject<HTMLDivElement>) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const scrollOffset = e.key === 'ArrowLeft' ? -100 : e.key === 'ArrowRight' ? 100 : 0;
    if (scrollOffset !== 0) {
      ref.current?.scrollBy({
        top: 0,
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return { handleKeyDown };
};
