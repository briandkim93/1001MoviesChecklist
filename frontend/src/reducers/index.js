import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import TogglePasswordResetRequestReducer from './TogglePasswordResetRequestReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import TokenReducer from './TokenReducer';
import UserInfoReducer from './UserInfoReducer';
import EmailVerifyRequestStatusReducer from './EmailVerifyRequestStatusReducer';
import EmailVerifyStatusReducer from './EmailVerifyStatusReducer';
import PasswordResetRequestStatusReducer from './PasswordResetRequestStatusReducer';
import PasswordResetStatusReducer from './PasswordResetStatusReducer';
import ConfirmCredentialsStatusReducer from './ConfirmCredentialsStatusReducer';
import PasswordChangeStatusReducer from './PasswordChangeStatusReducer';
import EmailChangeStatusReducer from './EmailChangeStatusReducer';
import AccountDeleteStatusReducer from './AccountDeleteStatusReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayPasswordResetRequest: TogglePasswordResetRequestReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  token: TokenReducer,
  userInfo: UserInfoReducer,
  emailVerifyRequestStatus: EmailVerifyRequestStatusReducer,
  emailVerifyStatus: EmailVerifyStatusReducer,
  passwordResetRequestStatus: PasswordResetRequestStatusReducer,
  passwordResetStatus: PasswordResetStatusReducer,
  confirmCredentialsStatus: ConfirmCredentialsStatusReducer,
  passwordChangeStatus: PasswordChangeStatusReducer,
  emailChangeStatus: EmailChangeStatusReducer,
  accountDeleteStatus: AccountDeleteStatusReducer
});

export default rootReducer;