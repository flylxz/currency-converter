import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Header } from './components';
import { Routes } from './routes';

function App() {
  return (
    <Container fixed>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Container>
  );
}

export default App;
