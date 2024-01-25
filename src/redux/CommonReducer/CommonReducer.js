import { combineReducers } from "redux";
import { ProductReducer } from "../../reducer/ProductReducer";


export const CommonReducer=combineReducers({
    shoppingFeature:ProductReducer,
});