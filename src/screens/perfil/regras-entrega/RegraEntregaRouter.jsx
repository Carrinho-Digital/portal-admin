import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import RegrasEntrada from './RegrasEntrega';
import RegraEntradaNovo from './RegraEntregaNovo'
import RegraEntregaAlterar from './RegraEntregaAlterar'

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/novo`}>
            <RegraEntradaNovo />
        </Route>
        {/* <Route exact path={`${match.path}/editar/:id`}>
            <RegraEntregaAlterar />
        </Route> */}
        <Route path={match.path}>
            <RegrasEntrada />
        </Route>
    </Switch>
}