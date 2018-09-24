import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ChecklistContainer from '../ChecklistContainer/ChecklistContainer';
import AccountSettings from '../AccountSettings/AccountSettings';
import EmailVerify from '../Authentication/EmailVerify/EmailVerify';
import PasswordReset from '../Authentication/PasswordReset/PasswordReset';
import PageNotFound from '../PageNotFound/PageNotFound';

const Main = () => (
  <main>
    <Switch>
      <Redirect from='/' to='/checklist/1' exact />
      <Redirect from='/checklist' to='/checklist/1' exact />
      <Route path='/checklist/' component={ChecklistContainer} />
      <Route path='/account/settings' component={AccountSettings} />
      <Route path='/verify/:email_verification_code' component={EmailVerify} />
      <Route path='/reset/:uid/:token' component={PasswordReset} />
      <Route component={PageNotFound} />
    </Switch>
  </main>
);

export default Main;