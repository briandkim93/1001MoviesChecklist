import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './AccountSettings.css';
import AccountInfo from '../AccountInfo/AccountInfo';
import PasswordChange from '../PasswordChange/PasswordChange';
import EmailChange from '../EmailChange/EmailChange';
import EmailVerifyRequest from '../EmailVerifyRequest/EmailVerifyRequest';
import AccountDeactivate from '../AccountDeactivate/AccountDeactivate';

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