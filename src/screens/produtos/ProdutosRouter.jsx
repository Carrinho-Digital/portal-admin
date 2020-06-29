import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Produtos from './Produtos'
import ProdutoNovo from './ProdutoNovo'
import ProdutoAlterar from './ProdutoAlterar'

export default () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/novo`}>
        <ProdutoNovo />
      </Route>
      <Route exact path={`${match.path}/editar/:id`}>
        <ProdutoAlterar />
      </Route>
      <Route path={match.path}>
        <Produtos />
      </Route>
    </Switch>
  )
}
