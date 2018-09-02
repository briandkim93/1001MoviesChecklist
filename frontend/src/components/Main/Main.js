import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../containers/Home/Home';
import PasswordReset from '../../containers/PasswordReset/PasswordReset';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/reset/:uid/:token" component={PasswordReset} />
    </Switch>
  </main>
);

export default Main;