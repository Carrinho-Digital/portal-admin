import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import LoggedRouter from './routers/LoggedRouter';
import ContaLogin from './screens/conta/ContaLogin';

import { Provider } from 'react-redux'
import store from './store/index'

export default function App() {
  return <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login">
          <ContaLogin />
        </Route>
        <PrivateRoute path="/">
          <LoggedRouter />
        </PrivateRoute>
        <Redirect to="/login">
          <ContaLogin />
        </Redirect>
      </Switch>
    </Router>
  </Provider>
}