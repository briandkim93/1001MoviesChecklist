import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PasswordReset from '../../containers/PasswordReset/PasswordReset';

const Main = () => (
  <main>
    <Switch>
      <Route path="/reset/:uid/:token" component={PasswordReset} />
    </Switch>
  </main>
);

export default Main;