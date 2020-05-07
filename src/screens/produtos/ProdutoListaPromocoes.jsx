import * as React from 'react'
import { Row, Col, ListGroupItem, Badge, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPromocoesByProdutoId } from '../../store/produtos/actions'
import ListGroup from 'reactstrap/lib/ListGroup'
import { Link } from 'react-router-dom'

const ProdutoListaPromocoes = ({ id }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.produtos.promotionsOfProduct)

    React.useEffect(() => {
        dispatch(fetchPromocoesByProdutoId(id))
    }, [id])

    const getDesconto = promocao => {
        if (promocao.discountInPercent) {
            return `${Number(promocao.discountInPercent).toFixed(2)} %`
        } else {
            return `${Number(promocao.discountInPrice).toFixed(2)} R$`
        }
    }

    const getPeriod = promocao => {
        if (promocao.undefinedTime) {
            return <Badge color="secondary">Tempo indefinido</Badge>
        }

        const startDate = new Date(promocao.startDate)
        const endDate = new Date(promocao.endDate)
        return <>
            <Badge>{startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}</Badge> a <Badge>{endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}</Badge>
        </>
    }

    const renderItems = () => {
        if (!data.length) {
            return <ListGroupItem>Não há nenhuma promoção para este produto! <Link to="/promocoes/novo">Crie uma nova</Link></ListGroupItem>
        }

        return data.map(promocao => <ListGroupItem key={`item-${promocao._id}`}>
            <div className="d-flex justify-content-between">
                <span className="align-self-center">{getDesconto(promocao)}</span>
                <span className="align-self-center">
                    {getPeriod(promocao)}
                    <Link target="_blank" className="mx-1" to={`/promocoes/editar/${promocao._id}`}>
                        Ver mais
                    </Link>
                </span>
            </div>
        </ListGroupItem>)
    }

    return <Row>
        <Col>
            <h4>Últimas promoções</h4>
            <hr />
            <div className="d-flex justify-content-end mb-2">
                <Button tag={Link} to={`/promocoes/novo/${id}`} color="success" outline target="_blank">Nova promoção</Button>
            </div>
            <ListGroup>
                {renderItems()}
            </ListGroup>

        </Col>
    </Row>
}

export default ProdutoListaPromocoes