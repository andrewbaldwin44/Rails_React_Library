import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/Login/Index';
import Library from '../components/Library';
import Profile from '../components/Profile';
import FourOhFour from '../components/FourOhFour';

export default (
  <Router>
    <Switch>
      <Route path="/" exact>
          <Login accountCreated={true} />
      </Route>
      <Route path="/sign_up" exact component={Login} />
      <Route path="/library" exact component={Library} />
      <Route path="/users/profile" exact component={Profile} />
      <Route path="/*" exact component={FourOhFour} />
    </Switch>
  </Router>
)
