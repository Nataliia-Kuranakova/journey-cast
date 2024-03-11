import { useWeaterCastContext } from '../context/WeatherCastContext';

const useSortTripsList = () => {
  const { tripsList, searchTerm } = useWeaterCastContext();
  const sortedTripsList = tripsList
    .filter((trip) =>
      trip.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
    .sort((a, b): number => +new Date(a.start) - +new Date(b.start));

  return sortedTripsList;
};

export default useSortTripsList;
