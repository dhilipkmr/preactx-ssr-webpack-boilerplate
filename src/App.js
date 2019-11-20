import { h } from 'preact';
import Router from 'preact-router';
import Home from './routes/Home';
import Login from './routes/Login';

const App = ({url}) => (
  <Router url={url}>
    <Home path="/" />
    <Login path="/login" />
  </Router>
);

export default App;