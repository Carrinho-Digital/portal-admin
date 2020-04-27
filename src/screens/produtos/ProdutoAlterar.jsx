import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Col, Container, Row, BreadcrumbItem, Breadcrumb, Card, CardBody } from 'reactstrap';

import { getProdutoById, updateProduto } from '../../store/produtos/actions';
import ProdutoForm from './ProdutoForm';

const ProdutoAlterar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();
    const produtoAtual = useSelector(state => state.produtos.produtoAtual)

    React.useEffect(() => {
        dispatch(getProdutoById(id))
    }, [id])

    const handleSubmit = async e => {
        await dispatch(updateProduto(e))
        history.push("/produtos")
    }

    if (!produtoAtual) {
        return <Container>
            <Row>
                <Col>
                    <h1>Carregando...</h1>
                </Col>
            </Row>
        </Container>
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
                <ProdutoForm initialValues={produtoAtual} onSubmit={handleSubmit} />
            </CardBody>
        </Card>

    </Container>
    return
}

export default ProdutoAlterar