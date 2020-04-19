import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../../store/conta/actions';
import ProdutoForm from './ProdutoForm';

const ProdutoNovo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        debugger
        await dispatch(login(e))
        history.push("/")
    }

    return <ProdutoForm onSubmit={handleSubmit} />
}

export default ProdutoNovo