import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import produtos from './produtos/reducers'
import promocoes from './promocoes/reducers'
import regrasEntrega from './regras-entrega/reducers'

const reducers = combineReducers({
    produtos,
    promocoes,
    form: formReducer,
    regrasEntrega
})

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))