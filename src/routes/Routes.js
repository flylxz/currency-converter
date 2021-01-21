import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Main, CurrencyList } from '../views';

export const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Main />
      </Route>
      <Route path='/list'>
        <CurrencyList />
      </Route>
    </Switch>
  );
};
