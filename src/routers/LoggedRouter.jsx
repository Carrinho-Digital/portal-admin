import React from 'react';
import { Switch } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

import PrivateRoute from '../components/auth/PrivateRoute';
import Navbar from '../components/Navbar';
import Home from '../screens/home/Home';
import ProdutosRouter from '../screens/produtos/ProdutosRouter';
import Vendas from '../screens/vendas/Vendas';

export default function App() {
  return <>
    <header style={{ marginBottom: "65px" }}>
      <Navbar />
    </header>
    <main className="flex-shrink-0" role="main">
      <Switch>
        <PrivateRoute path="/vendas">
          <Vendas />
        </PrivateRoute>
        <PrivateRoute path="/produtos">
          <ProdutosRouter />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </main>
    <footer className="footer mt-auto py-2">
      <Container className="d-flex">
        <Row className="justify-content-center">
          © Carrinho Digital - Todos os direitos reservados
          </Row>
      </Container>
    </footer>
  </>
}


