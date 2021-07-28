import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {contactsReducer} from "./contacts-reducer";


const rootReducer = combineReducers({
    contacts: contactsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type TState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>
export type TActions = any

//@ts-ignore
window.store = store