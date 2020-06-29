import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import vendas from './vendas/reducers';
import produtos from './produtos/reducers'
import promocoes from './promocoes/reducers'
import regrasEntrega from './regras-entrega/reducers'

const reducers = combineReducers({
    form: formReducer,
    produtos,
    promocoes,
    regrasEntrega,
    vendas,
})

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))