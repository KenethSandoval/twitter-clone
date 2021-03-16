import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {map} from 'lodash';
import configRoutes from './configRoutes';

export default function Routing() {
  return (
    <Router>
      <Switch>
        {map(configRoutes, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.page />
          </Route> 
        ))}
      </Switch>
    </Router>
  );
}
