import { useState, useEffect } from 'react';

const useFirstVisit = (key: string, initialValue: string | null) => {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    const savedMark = localStorage.getItem(key);
    return savedMark ? JSON.parse(savedMark) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(isFirstVisit));
  }, [isFirstVisit, key]);

  return [isFirstVisit, setIsFirstVisit] as const;
};

export default useFirstVisit;
