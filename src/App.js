import { BrowserRouter as Router } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';

import { Header } from './components';
import { Routes } from './routes';

function App() {
  return (
    <Router>
      <Header />
      <CssBaseline />
      <Container fixed>
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
