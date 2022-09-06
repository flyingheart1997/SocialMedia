import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import getAUserReducer from "./GetUserReducer";
import getUserPostReducer from "./GetUserPostReducer";

export const reducers = combineReducers({authReducer, postReducer,getAUserReducer,getUserPostReducer});