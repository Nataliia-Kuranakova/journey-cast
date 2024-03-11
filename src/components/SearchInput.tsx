import { useRef, useEffect } from 'react';
import { useWeaterCastContext } from '../context/WeatherCastContext';

import { IoMdCloseCircleOutline } from 'react-icons/io';

import Buttons from './Buttons';

interface SearchInputProps {
  isSearchInput: boolean;
  isMounted: boolean;
}

const SearchInput = ({
  isSearchInput,
  isMounted,
}: SearchInputProps): JSX.Element => {
  const { searchTerm, handleSearchInput, setSearchTerm } =
    useWeaterCastContext();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchInput) {
      searchInputRef.current?.focus();
    }
  }, [isSearchInput]);

  const closeIcon =
    searchTerm !== '' ? (
      <Buttons onClick={() => setSearchTerm('')}>
        <IoMdCloseCircleOutline />
      </Buttons>
    ) : null;

  const mountedStyle = { animation: 'scaleInput 300ms ease-in' };
  const unmountedStyle = {
    animation: 'hideInput 320ms ease-out',
    animationFillMode: 'forwards',
  };

  return (
    <div className="search-input-container">
      <input
        ref={searchInputRef}
        className="search-input"
        placeholder="Search for a trip"
        type="text"
        value={searchTerm}
        onChange={handleSearchInput}
        style={isMounted ? mountedStyle : unmountedStyle}
      />
      <div className="search-input-icon">{closeIcon}</div>
    </div>
  );
};

export default SearchInput;
