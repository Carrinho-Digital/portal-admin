import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Produtos from './Produtos'

export default () => {
    const match = useRouteMatch()

    return <Switch>
        <Route path={`${match.path}/:topicId`}>
            parâmetro passado
        </Route>
        <Route path={match.path}>
            <Produtos />
        </Route>
    </Switch>
}