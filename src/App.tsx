import { AppDataProvider } from './context/WeatherCastContext';

import Container from './components/Container';

import '../src/styles/main.scss';

const App = (): JSX.Element => {
  return (
    <AppDataProvider>
      <Container />
    </AppDataProvider>
  );
};

export default App;
