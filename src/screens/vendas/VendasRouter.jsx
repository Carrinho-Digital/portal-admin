import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import Vendas from './Vendas'
import DetalhesVenda from './DetalhesVenda'

export default function VendasRouter() {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/detalhes/:id`}>
        <DetalhesVenda />
      </Route>
      <Route path={match.path}>
        <Vendas />
      </Route>
    </Switch>
  )
}
