import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import ProdutoForm from './ProdutoForm';
import { insertProduto } from '../../store/produtos/actions';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody } from 'reactstrap';

const ProdutoNovo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async e => {
        await dispatch(insertProduto(e))
        history.push("/produtos")
    }

    return <Container>
        <Row>
            <Col xl="12">
                <Breadcrumb>
                    <BreadcrumbItem tag={Link} to="/produtos">
                        Produtos
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Alterar
                    </BreadcrumbItem>
                </Breadcrumb>
            </Col>
        </Row>
        <Card>
            <CardBody>
                <ProdutoForm initialValues={{tags:[]}} onSubmit={handleSubmit} />
            </CardBody>
        </Card>

    </Container>
}

export default ProdutoNovo