import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import App from './App';
import store, { persistor } from './redux';

const container = document.getElementById('root');
const root = createRoot(container);
const history = createBrowserHistory({ window });
root.render(
  <React.StrictMode>
    <HistoryRouter history={ history }>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <App />
        </PersistGate>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
