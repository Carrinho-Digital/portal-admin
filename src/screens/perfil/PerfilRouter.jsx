import React from 'react';
import { Route, Switch, useRouteMatch, Link, useHistory } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';

import PerfilAlterar from './PerfilAlterar';
import RegraEntregaRouter from './regras-entrega/RegraEntregaRouter'
import RegraEntregaNovo from './regras-entrega/RegraEntregaNovo';
import RegraEntregaAlterar from './regras-entrega/RegraEntregaAlterar';

export default () => {
    const match = useRouteMatch()
    const history = useHistory()
    const currentPath = history.location.pathname
    return <Switch>
        <Container>
            <Row>
                <Col xl="3">
                    <ListGroup>
                        <ListGroupItem className="text-decoration-none" to={match.path} tag={Link} active={currentPath == match.path}>
                            Perfil
                        </ListGroupItem>
                        <ListGroupItem className="text-decoration-none" to={`${match.path}/regras-entrega`} tag={Link} active={currentPath == `${match.path}/regras-entrega`}>
                            Regras de entrega
                        </ListGroupItem>
                        <ListGroupItem className="text-decoration-none" to={`${match.path}/disponibilidade-entrega`} tag={Link} active={currentPath == `${match.path}/disponibilidade-entrega`}>
                            Disponibilidade de entrega
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col xl="9">
                    <Route exact path={match.path}>
                        <PerfilAlterar />
                    </Route>
                    <Route exact path={`${match.path}/regras-entrega`}>
                        <RegraEntregaRouter/>
                    </Route>
                    <Route exact path={`${match.path}/regras-entrega/novo`}>
                        <RegraEntregaNovo/>
                    </Route>
                    <Route exact path={`${match.path}/regras-entrega/editar/:id`}>
                        <RegraEntregaAlterar/>
                    </Route>
                    <Route exact path={`${match.path}/disponibilidade-entrega`}>
                        <h1>Disponibilidade de entrega</h1>
                    </Route>
                </Col>
            </Row>
        </Container>
    </Switch>
}