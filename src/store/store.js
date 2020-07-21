import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { authReducer } from './../reducers/authReducer';
import { uiReducer } from './../reducers/uiReducer';
import {notesReducer} from '../reducers/noteReducer';


const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
);

