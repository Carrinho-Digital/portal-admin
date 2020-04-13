import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Home from '../screens/home/Home';
import ProdutosRouter from '../screens/produtos/ProdutosRouter';
import Vendas from '../screens/vendas/Vendas';
import { Container, Row } from 'reactstrap';

export default function App() {
  return <>
    <Router>
      <header className="mb-5">
        <Navbar />
      </header>
      <main className="flex-shrink-0" role="main">
        <Switch>
          <Route path="/vendas">
            <Vendas />
          </Route>
          <Route path="/produtos">
            <ProdutosRouter />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <footer className="footer mt-auto py-2">
        <Container className="d-flex">
          <Row className="justify-content-center">
            © Carrinho Digital - Todos os direitos reservados
          </Row>
        </Container>
      </footer>
    </Router>
  </>
}


