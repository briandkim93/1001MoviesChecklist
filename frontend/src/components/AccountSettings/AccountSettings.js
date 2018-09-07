import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AccountInfo from '../../containers/AccountInfo/AccountInfo';
import PasswordChange from '../../containers/PasswordChange/PasswordChange';

const AccountSettings = () => (
  <Switch>
    <Route exact path="/account/settings" component={AccountInfo} />
    <Route path="/account/settings/password" component={PasswordChange} />
  </Switch>
);

export default AccountSettings;