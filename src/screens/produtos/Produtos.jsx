import React from 'react';
import { Container, Row, Button, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {

    return <>
        <Container>
            <Row>
                <Col>
                    <h1>Produtos</h1>
                </Col>
                <Col>
                    <div className="d-flex align-self-center justify-content-end">
                        <Button outline color="success" tag={Link} to="/produtos/novo">
                            Novo <FontAwesomeIcon icon="trash-o" />
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>$ Venda</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Batata</td>
                            <td>2</td>
                            <td>R$ 22,00</td>
                            <td>Top</td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    </>
}