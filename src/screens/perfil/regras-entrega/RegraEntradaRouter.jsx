import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import RegrasEntrada from './RegrasEntrada';
import RegraEntradaNovo from './RegraEntradaNovo'
import RegraEntradaAlterar from './RegraEntradaAlterar'

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/novo`}>
            <RegraEntradaNovo />
        </Route>
        <Route exact path={`${match.path}/editar/:id`}>
            <RegraEntradaAlterar />
        </Route>
        <Route path={match.path}>
            <RegrasEntrada />
        </Route>
    </Switch>
}