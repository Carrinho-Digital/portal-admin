import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PerfilAlterar from './PerfilAlterar'

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route exact path={match.path}>
            <PerfilAlterar />
        </Route>
    </Switch>
}