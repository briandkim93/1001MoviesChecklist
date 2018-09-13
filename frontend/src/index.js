import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxPromise from 'redux-promise';

import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'displaySignup',
    'displayLogin',
    'displayReset',
    'signupStatus',
    'loginStatus',
    'emailVerifyRequestStatus',
    'emailVerifyStatus',
    'passwordResetRequestStatus',
    'passwordResetStatus',
    'passwordChangeStatus',
    'emailChangeStatus',
    'confirmCredentialsStatus',
    'accountDeleteStatus'
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