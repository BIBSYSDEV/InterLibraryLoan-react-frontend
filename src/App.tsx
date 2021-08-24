import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*" component={AppContent} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
