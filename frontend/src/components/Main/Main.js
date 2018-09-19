import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Checklist from '../Checklist/Checklist';
import AccountSettings from '../AccountSettings/AccountSettings';
import EmailVerify from '../Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../Authentication/PasswordReset/PasswordReset';

const Main = () => (
  <main>
    <Switch>
      <Redirect from='/' to='alphabetical/' exact />
      <Route path='/alphabetical/' component={Checklist} />
      <Route path='/account/settings' component={AccountSettings} />
      <Route path='/verify/:email_verification_code' component={EmailVerify} />
      <Route path='/reset/:uid/:token' component={PasswordReset} />
    </Switch>
  </main>
);

export default Main;