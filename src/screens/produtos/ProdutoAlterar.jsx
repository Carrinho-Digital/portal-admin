import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

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
    debugger
    if (!produtoAtual) {
        return <Container>
            <Row>
                <Col>
                    <h1>Carregando...</h1>
                </Col>
            </Row>
        </Container>
    }

    return <ProdutoForm initialValues={produtoAtual} onSubmit={handleSubmit} />
}

export default ProdutoAlterar