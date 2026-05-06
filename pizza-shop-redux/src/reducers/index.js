import { combineReducers } from "redux";
import { pizzasReducer } from "./pizzas.reducer";

export const rootReducer = combineReducers({ pizzas: pizzasReducer });
