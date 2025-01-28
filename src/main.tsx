import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/:id" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
);
