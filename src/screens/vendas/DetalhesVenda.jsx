import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../components/Loading'
import { fetchVendaById } from '../../store/vendas/actions'
import { formatHorarioFechamento } from './Venda'
import DetalhesDelivery from './DetalhesDelivery'
import DetalhesCliente from './DetalhesCliente'
import DetalhesPagamento from './DetalhesPagamento'

function Detalhes({ venda }) {
  return (
    <Col>
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon="shopping-cart" />{' '}
            <span>
              <strong>Fechada em:</strong>
              {' ' + formatHorarioFechamento(venda.updatedAt)}
            </span>
          </div>
          <div>
            <Button className="mr-3" type="submit" color="success">
              Aceitar Pedido
            </Button>
            <Button className="mr-2" type="button" color="danger">
              Recusar Pedido
            </Button>
          </div>
        </div>
        <div className="card-body">
          <DetalhesCliente user={venda.user} />
          <DetalhesPagamento payment={venda.payment} />
          <DetalhesDelivery
            delivery={venda.delivery}
            availability={venda.availability}
          />
        </div>
      </div>
      <h3>Produtos</h3>
      <table class="table">
        <thead>
          <tr className="table-light">
            <th scope="col" className="text-dark">
              Produto
            </th>
            <th scope="col" className="text-dark">
              Quantidade
            </th>
            <th scope="col" className="text-dark">
              Preço de Venda
            </th>
          </tr>
        </thead>
        <tbody>
          {venda.products.map(({ product, quantity }) => {
            return (
              <tr table-light>
                <td>{`${product.name} - ${product.size ? product.size : ''}${
                  product.unit
                }`}</td>
                <td>{quantity}</td>
                <td>R$ {Number(product.sellPrice).toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Col>
  )
}

export default function DetalhesVenda(props) {
  const history = useHistory()
  const { id } = useParams()
  const dispatch = useDispatch()
  const venda = useSelector((state) => state.vendas.venda)

  useEffect(() => {
    if (!id) {
      return history.push('/vendas')
    }

    function getVendaToDetails(id) {
      dispatch(fetchVendaById(id))
    }

    getVendaToDetails(id)
  }, [id, history, dispatch])

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/vendas">
              Vendas
            </BreadcrumbItem>
            <BreadcrumbItem>Detalhes da Venda</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>{!venda ? <Loading /> : <Detalhes venda={venda} />}</Row>
    </Container>
  )
}
