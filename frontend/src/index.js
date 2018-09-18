import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxPromise from 'redux-promise';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'displaySignup',
    'displayLogin',
    'displayPasswordResetRequest',
    'signupStatus',
    'loginStatus',
    'facebookLoginStatus',
    'facebookLoginRenderStatus',
    'refreshTokenStatus',
    'emailVerifyRequestStatus',
    'emailVerifyStatus',
    'passwordResetRequestStatus',
    'passwordResetStatus',
    'confirmCredentialsStatus',
    'passwordChangeStatus',
    'emailChangeStatus',
    'accountDeactivateStatus'
  ]
}

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(ReduxPromise));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);