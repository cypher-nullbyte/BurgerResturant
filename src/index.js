import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';
import BurgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
  burgerBuilder:BurgerBuilderReducer,
  order:orderReducer,
});

const store=createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
