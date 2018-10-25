import * as actionTypes from '../actions/actionTypes';

const initialState = {
}

 const resetStatesReducer = (state = null, action) => {
    switch(action.type) {

        case actionTypes.RESET_ALL_STATES:
        return {
            ...state
        };
        default:
        return state;
      
    }
}
export default resetStatesReducer;