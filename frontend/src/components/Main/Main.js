import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../containers/Home/Home';
import AccountSettings from '../AccountSettings/AccountSettings';
import EmailVerify from '../../containers/Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../../containers/Authentication/PasswordReset/PasswordReset';

const Main = () => (
  <main>
    <Switch>
      <Redirect from='/' to='alphabetical/list' exact />
      <Redirect from='/alphabetical' to='/alphabetical/list' exact />
      <Route path='/' component={Home} />
      <Route path='/account/settings' component={AccountSettings} />
      <Route path='/verify/:email_verification_code' component={EmailVerify} />
      <Route path='/reset/:uid/:token' component={PasswordReset} />
    </Switch>
  </main>
);

export default Main;