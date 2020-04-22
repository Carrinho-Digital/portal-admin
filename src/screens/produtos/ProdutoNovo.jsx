import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProdutoForm from './ProdutoForm';
import { insertProduto } from '../../store/produtos/actions';

const ProdutoNovo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {        
        await dispatch(insertProduto(e))
        history.push("/produtos")
    }

    return <ProdutoForm onSubmit={handleSubmit} />
}

export default ProdutoNovo