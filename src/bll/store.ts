import { appReducer } from './reducers/app'
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {contactsReducer} from "./reducers/contacts";


const rootReducer = combineReducers({
    app: appReducer,
    contacts: contactsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type TState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<TState, void, TActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>
export type TActions = any

//@ts-ignore
window.store = store