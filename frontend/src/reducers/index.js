import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import TogglePasswordResetRequestReducer from './TogglePasswordResetRequestReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import FacebookLoginStatusReducer from './FacebookLoginStatusReducer';
import FacebookLoginRenderStatusReducer from './FacebookLoginRenderStatusReducer';
import TokenReducer from './TokenReducer';
import RefreshTokenStatusReducer from './RefreshTokenStatusReducer';
import UserInfoReducer from './UserInfoReducer';
import EmailVerifyRequestStatusReducer from './EmailVerifyRequestStatusReducer';
import EmailVerifyStatusReducer from './EmailVerifyStatusReducer';
import PasswordResetRequestStatusReducer from './PasswordResetRequestStatusReducer';
import PasswordResetStatusReducer from './PasswordResetStatusReducer';
import ConfirmCredentialsStatusReducer from './ConfirmCredentialsStatusReducer';
import PasswordChangeStatusReducer from './PasswordChangeStatusReducer';
import EmailChangeStatusReducer from './EmailChangeStatusReducer';
import AccountDeactivateStatusReducer from './AccountDeactivateStatusReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayPasswordResetRequest: TogglePasswordResetRequestReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  facebookLoginStatus: FacebookLoginStatusReducer,
  facebookLoginRenderStatus: FacebookLoginRenderStatusReducer,
  token: TokenReducer,
  refreshTokenStatus: RefreshTokenStatusReducer,  
  userInfo: UserInfoReducer,
  emailVerifyRequestStatus: EmailVerifyRequestStatusReducer,
  emailVerifyStatus: EmailVerifyStatusReducer,
  passwordResetRequestStatus: PasswordResetRequestStatusReducer,
  passwordResetStatus: PasswordResetStatusReducer,
  confirmCredentialsStatus: ConfirmCredentialsStatusReducer,
  passwordChangeStatus: PasswordChangeStatusReducer,
  emailChangeStatus: EmailChangeStatusReducer,
  accountDeactivateStatus: AccountDeactivateStatusReducer
});

export default rootReducer;