import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading:false
};

const fetchOrderReducer = (state = initialState, action) => {
        switch(action.type) {
            case actionTypes.FETCH_ORDERS_SUCCESS :
                const fetchedorders =[];
                    for(let key in action.res.data) {
                        fetchedorders.push({
                            ...action.res.data[key],
                            id: key
                        });
                    }

            return {
                    ...state,
                    loading:false,
                    orders:fetchedorders
            };

            case actionTypes.FETCH_ORDERS_START :
            return {
                ...state,
                loading:true
            };
            case actionTypes.FETCH_ORDERS_FAIL :
            return {
                    ...state,
                    loading:false
            };
            default:
            return state;
        }
}
export default fetchOrderReducer;