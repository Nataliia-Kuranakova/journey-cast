import { useKeyboardNavigation } from '../hooks/accessibility/useKeyboardNavigation';
import { CitiesList } from '../store/apis/citiesApi/types';
import { nanoid } from '@reduxjs/toolkit';

interface AutocompleteProps {
  data: CitiesList;
  isAutocomplete: boolean;

  onCorrectSpelling: (fullName: string) => void;
  onAutocompleteData: (cityName: string, countryName: string) => void;
}

const Autocomplete = ({
  data,
  isAutocomplete,
  onCorrectSpelling,
  onAutocompleteData,
}: AutocompleteProps): JSX.Element => {
  const handleAddProperCity = (cityName: string, countryName: string) => {
    onCorrectSpelling(`${cityName}, ${countryName}`);
    onAutocompleteData(cityName, countryName);
  };

  const { itemRefs, handleKeyDown } = useKeyboardNavigation({
    itemCount: data.geonames.length,
    onItemSelect: (index) => {
      const selectedCity = data.geonames[index];
      handleAddProperCity(selectedCity.toponymName, selectedCity.countryName);
    },
  });

  const autocompleteClass = isAutocomplete
    ? 'autocomplete-fade-in'
    : 'autocomplete-fade-out';

  return (
    <ul
      className={`autocomplete ${autocompleteClass} ${
        data.geonames.length === 0 ? 'warning-bg-color ' : ''
      }`}
      role="listbox"
    >
      {data.geonames.length === 0 ? (
        <p className="autocomplete-warning card-title">
          Please check the spelling
        </p>
      ) : null}
      {data.geonames.map((elem, index) => {
        const id = nanoid();
        return (
          <li
            role="option"
            tabIndex={0}
            aria-selected={false}
            ref={(el) => (itemRefs.current[index] = el)}
            key={id}
            onClick={() =>
              handleAddProperCity(elem.toponymName, elem.countryName)
            }
            onKeyDown={handleKeyDown(index)}
          >
            {elem.toponymName}, {elem.countryName}
          </li>
        );
      })}
    </ul>
  );
};

export default Autocomplete;
