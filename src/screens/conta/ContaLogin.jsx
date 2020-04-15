import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../../store/conta/actions';
import ContaLoginForm from './ContaLoginForm';

const ContaLogin = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        debugger
        await dispatch(login(e))
        history.push("/")
    }

    return <main className="h-100">
        <ContaLoginForm onSubmit={handleSubmit}/>
    </main>
}

export default ContaLogin