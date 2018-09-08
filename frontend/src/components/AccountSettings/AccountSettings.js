import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AccountInfo from '../../containers/AccountInfo/AccountInfo';
import PasswordChange from '../../containers/PasswordChange/PasswordChange';
import EmailChange from '../../containers/EmailChange/EmailChange';
import EmailVerifyRequest from '../../containers/EmailVerifyRequest/EmailVerifyRequest';

const AccountSettings = () => (
  <Switch>
    <Route exact path="/account/settings" component={AccountInfo} />
    <Route path="/account/settings/password" component={PasswordChange} />
    <Route path="/account/settings/email" component={EmailChange} />
    <Route path="/account/settings/verify" component={EmailVerifyRequest} />
  </Switch>
);

export default AccountSettings;