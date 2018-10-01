import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const fetchOrderStart = () => {
        return {
            type:actionTypes.FETCH_ORDERS_START,
        }
}

export const fetchOrderSuccess = (res) => {
    return {
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            res: res
    }
}

export const fetchOrderFail = (error) => {
    return {
            type: actionTypes.PURCHASE_BURGER_FAIL,
            error: error
    }
}

export const fetchingOrders = () => {
        return dispatch => {
            dispatch(fetchOrderStart());
            axios.get('/orders.json')
            .then(res => {
                dispatch(fetchOrderSuccess(res))
            })
            .catch(err => {
            dispatch(fetchOrderFail(err))
            })
        }
}