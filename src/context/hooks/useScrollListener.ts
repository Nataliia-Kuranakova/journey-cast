import { useState, useEffect } from 'react';

export function useScrollListener() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderFixed(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isHeaderFixed;
}

/// previous code from context

// const [isHeaderFixed, setIsHeaderFixed] = useState(false);

// useEffect(() => {
//   const handleScroll = () => {
//     const scrollY = window.scrollY;

//     const headerFixed = scrollY > 50;

//     setIsHeaderFixed(headerFixed);
//   };

//   window.addEventListener('scroll', handleScroll);

//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);
