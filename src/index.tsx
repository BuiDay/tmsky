import React from 'react';
import ReactDOM from 'react-dom/client';
// import '../src/styles/index.css';
import App from './App';
import { persistStore } from 'redux-persist'
import reduxStore from "./store/redux"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

let persistor = persistStore(reduxStore);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={reduxStore} >
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);


