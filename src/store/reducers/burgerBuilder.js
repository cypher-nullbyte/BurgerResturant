import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,

};

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const burgerBuilder=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENTS:
            let updatedIngredient={[action.ingredientName]:state.ingredients};
            let updatedIngredients=updateObject(state.ingredients,updatedIngredient);
            let updatedState={
                ingrediens:updatedIngredients,
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENTS:
            updatedIngredient={[action.ingredientName]:state.ingredients}
            updatedIngredients=updateObject(state.ingredients,updatedIngredient);
            updatedState={
                ingrediens:updatedIngredients,
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updatedState);

        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat,
                },
                totalPrice:initialState.totalPrice,
                error:false,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true,
            }
        default:
            return state;
    }
};

export default burgerBuilder;