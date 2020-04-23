import React, { useState } from 'react';
import { Container, Row, Button, Col, Table, PaginationLink, PaginationItem, Pagination } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProdutos, deleteProduto } from '../../store/produtos/actions';

export default () => {
    const dispatch = useDispatch()
    const { data, currentPage, totalPages } = useSelector(state => state.produtos.response)
    const [limit, setLimit] = useState(5)

    React.useEffect(() => {
        dispatch(fetchProdutos())
    }, [])

    const renderProdutos = () => data.map((produto) => (
        <tr key={`produto-${produto._id}`}>
            <td>{produto.name}</td>
            <td>{produto.amount}</td>
            <td>{produto.sellPrice}</td>
            <td className="d-flex justify-content-center">
                <Button className="mr-2" outline color="warning" tag={Link} to={`/produtos/editar/${produto._id}`}>
                    <FontAwesomeIcon icon="pencil-alt" />
                </Button>

                <Button outline color="danger" tag={Link} onClick={async () => {
                    if (!window.confirm("Tem certeza de que deseja deletar?")) {
                        return
                    }
                    await dispatch(deleteProduto(produto._id))
                    await dispatch(fetchProdutos())
                }}>
                    <FontAwesomeIcon icon="trash" />
                </Button>
            </td>
        </tr>
    ))

    const paginate = page => dispatch(fetchProdutos(page))


    const renderPaginationItems = () => {
        const items = new Array(totalPages).fill(0)

        return items.map((_, index) => <PaginationItem active={currentPage === index} key={`pagination-item-${index}`}>
            <PaginationLink onClick={() => paginate(index)} to="#">{index + 1}</PaginationLink>
        </PaginationItem >)
    }

    return <>
        <Container>
            <Row>
                <Col>
                    <h1>Produtos</h1>
                </Col>
                <Col>
                    <div className="d-flex align-self-center justify-content-end">
                        <Button outline color="success" tag={Link} to="/produtos/novo">
                            Novo <FontAwesomeIcon icon="plus" />
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>$ Venda</th>
                                <th className="text-center">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProdutos()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink first onClick={() => paginate(1)} to="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous onClick={() => paginate(currentPage - 1)} to="#" />
                        </PaginationItem>
                        {renderPaginationItems()}
                        <PaginationItem>
                            <PaginationLink next onClick={() => paginate(currentPage + 1)} to="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last onClick={() => paginate(totalPages)} to="#" />
                        </PaginationItem>
                    </Pagination>
                </Col>
            </Row>
        </Container>
    </>
}