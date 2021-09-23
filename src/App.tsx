import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import NotFoundPage from './components/NotFoundPage';
import SuccessPage from './components/SucessPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContent} />
        <Route exact path="/success" component={SuccessPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
