import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import{
  persistStore,
  persisitReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

const persistConfig = {
  key: 'root',
  storage,
  version : 1,
};

const persistedReducer = persisitReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persisitReducer,
  middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);


