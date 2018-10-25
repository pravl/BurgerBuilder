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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
); 

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
