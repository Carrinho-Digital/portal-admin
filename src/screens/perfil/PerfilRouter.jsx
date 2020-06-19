import React from 'react';
import { Route, Switch, useRouteMatch, Link, useHistory } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';

import PerfilAlterar from './PerfilAlterar';
import RegrasEntrega from './regras-entrega/RegrasEntrega';
import RegraEntregaNovo from './regras-entrega/RegraEntregaNovo';

import DisponibilidadeEntrega from './disponibilidade-entrega/DisponibilidadeEntrega'
import DisponibilidadeEntregaNovo from './disponibilidade-entrega/DisponibilidadeEntregaNovo';
import DisponibilidadeEntregaAlterar from './disponibilidade-entrega/DisponibilidadeEntregaAlterar';


export default () => {
    const match = useRouteMatch()
    const history = useHistory()
    const currentPath = history.location.pathname
    return <Switch>
        <Container>
            <Row>
                <Col xl="3">
                    <ListGroup>
                        <ListGroupItem className="text-decoration-none" to={match.path} tag={Link} active={currentPath === match.path}>
                            Perfil
                        </ListGroupItem>
                        <ListGroupItem className="text-decoration-none" to={`${match.path}/regras-entrega`} tag={Link} active={currentPath === `${match.path}/regras-entrega`}>
                            Regras de entrega
                        </ListGroupItem>
                        <ListGroupItem className="text-decoration-none" to={`${match.path}/disponibilidades-entrega`} tag={Link} active={currentPath === `${match.path}/disponibilidades-entrega`}>
                            Disponibilidade de entrega
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col xl="9">
                    <Route exact path={match.path}>
                        <PerfilAlterar />
                    </Route>

                    <Route exact path={`${match.path}/regras-entrega`}>
                        <RegrasEntrega />
                    </Route>
                    <Route exact path={`${match.path}/regras-entrega/novo`}>
                        <RegraEntregaNovo />
                    </Route>
                    {/* <Route exact path={`${match.path}/regras-entrega/editar/:id`}>
                        <RegraEntregaAlterar/>
                    </Route> */}

                    <Route exact path={`${match.path}/disponibilidades-entrega`}>
                        <DisponibilidadeEntrega />
                    </Route>
                    <Route exact path={`${match.path}/disponibilidades-entrega/novo`}>
                        <DisponibilidadeEntregaNovo />
                    </Route>
                    <Route exact path={`${match.path}/disponibilidades-entrega/editar/:id`}>
                        <DisponibilidadeEntregaAlterar/>
                    </Route>
                </Col>
            </Row>
        </Container>
    </Switch>
}