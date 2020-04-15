import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import conta from './conta/reducers'

const reducers = combineReducers({
    // vendas, produtos, home, 
    conta,
    form: formReducer
})

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))