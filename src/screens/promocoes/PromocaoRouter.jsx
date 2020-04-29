import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Promocoes from './Promocoes';
import PromocaoNovo from './PromocaoNovo'
import PromocaoAlterar from './PromocaoAlterar'

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/novo`}>
            <PromocaoNovo />
        </Route>
        <Route exact path={`${match.path}/editar/:id`}>
            <PromocaoAlterar />
        </Route>
        <Route path={match.path}>
            <Promocoes />
        </Route>
    </Switch>
}