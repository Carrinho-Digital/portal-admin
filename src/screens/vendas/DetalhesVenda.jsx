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

function formatAndShowDiscount(promotion, product) {
  if (!promotion) return 'R$ 0.00'

  const discountPriceNumber = Number(promotion.discountInPrice)
  const discountPercentNumber = Number(promotion.discountInPercent)

  if (isNaN(discountPriceNumber) || isNaN(discountPercentNumber))
    return 'R$ 0.00'

  if (discountPriceNumber > 0) return `- R$ ${discountPriceNumber.toFixed(2)}`
  if (discountPercentNumber > 0) {
    return `${discountPriceNumber.toFixed(2)}%`
  }

  return 'R$ 0.00'
}

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
      <table className="table">
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
            <th scope="col" className="text-dark">
              Desconto Aplicado
            </th>
          </tr>
        </thead>
        <tbody>
          {venda.products.map(({ product, quantity, promotion }) => {
            return (
              <tr key={product._id}>
                <td>{`${product.name} - ${product.size ? product.size : ''}${
                  product.unit
                }`}</td>
                <td>{quantity}</td>
                <td>R$ {Number(product.sellPrice).toFixed(2)}</td>
                <td>{formatAndShowDiscount(promotion)}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}></td>
            <td>R$ {Number(venda.price).toFixed(2)}</td>
            <td>Discounts</td>
          </tr>
        </tfoot>
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
