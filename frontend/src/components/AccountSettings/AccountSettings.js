import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AccountInfo from '../Authentication/AccountInfo/AccountInfo';
import PasswordChange from '../Authentication/PasswordChange/PasswordChange';
import EmailChange from '../Authentication/EmailChange/EmailChange';
import EmailVerifyRequest from '../Authentication/EmailVerifyRequest/EmailVerifyRequest';
import AccountDeactivate from '../Authentication/AccountDeactivate/AccountDeactivate';

const AccountSettings = () => (
  <Switch>
    <Route exact path="/account/settings" component={AccountInfo} />
    <Route path="/account/settings/password" component={PasswordChange} />
    <Route path="/account/settings/email" component={EmailChange} />
    <Route path="/account/settings/verify" component={EmailVerifyRequest} />
    <Route path="/account/settings/deactivate" component={AccountDeactivate} />
  </Switch>
);

export default AccountSettings;