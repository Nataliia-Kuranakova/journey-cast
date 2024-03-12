import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useWeaterCastContext } from '../context/WeatherCastContext';
import { tripsListPath } from '../consts/paths';

import NavBar from './NavBar';
import Slider from './Slider';
import TripsListPage from '../pages/TripsListPage';
import EmptyTripsListMsg from './EmptyTripsListMsg';
import NearestTripCastPage from '../pages/NearestTripCastPage';
import SelectedTripCastPage from '../pages/SelectedTripCastPage';

const Container = (): JSX.Element => {
  const { tripsList, isFirstVisit } = useWeaterCastContext();

  return (
    <main className="main-container">
      <Router>
        {!isFirstVisit && <Slider />}
        {tripsList.length === 0 && isFirstVisit && <EmptyTripsListMsg />}
        <NavBar />
        <Routes>
          <Route path={tripsListPath} element={<TripsListPage />} />
          <Route path="/journey-cast" element={<NearestTripCastPage />} />
          {tripsList.map((page) => {
            return (
              <Route
                key={page.name}
                path={`${tripsListPath}/${page.name}`}
                element={<SelectedTripCastPage />}
              />
            );
          })}
        </Routes>
      </Router>

      <div className="detailed-cast-wrapper"></div>
    </main>
  );
};

export default Container;
