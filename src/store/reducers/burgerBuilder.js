import * as actionTypes from '../actions/actionTypes';

const initialState ={
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad:1,
    cheese:2,
    meat : 3,
    bacon:4
}

const reducer = (state =initialState , action) => {
    switch(action.type) {

        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+ 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]- 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            
        case actionTypes.SET_INGREDIENTS:
            return {
            ...state,
            ingredients: action.ingredients,
            error:false,
            totalPrice: 4
        };
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
            ...state,
            error:true
        };
        default:
            return state;
    }
};

export default reducer;

