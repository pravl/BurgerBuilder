import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware , combineReducers, compose } from 'redux';
import  thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import fetchOrderReducer from './store/reducers/fetchOrders';
import resetStatesReducer from './store/reducers/resetStates';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
  }

const appReducer = combineReducers({
    burgerBuilder:reducer,
    order:orderReducer,
    fetchOrder:fetchOrderReducer,
    resetStates: resetStatesReducer
});

const rootReducer = (state , action ) => {
    
    if(action.type === 'RESET_ALL_STATES') {
        state= undefined;
    }
        return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));

const  persistor = persistStore(store)

const app = (
    <Provider store = {store}>
     <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </PersistGate>
    </Provider>
); 

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
