import React from 'react'
import { Row, Col } from 'reactstrap'
import { formatDiaDaEntrega, formatHorarioDaEntrega } from './Venda'

function DetalhesDelivery({ delivery, availability }) {
  let address = null

  if (delivery.method === 'delivery') {
    address = (
      <>
        <hr />
        <Row>
          <Col md="12" sm="12" xl="12">
            <h5 className="font-weight-bold">Endereço</h5>
            <hr />
          </Col>
          <Col md="12" sm="12" xl="12">
            <p>
              {delivery.address.street}, n° {delivery.address.number},{' '}
              {delivery.address.neighborhood}, {delivery.address.zipcode},{' '}
              {delivery.address.city}/{delivery.address.state} -{' '}
              {delivery.address.country}
            </p>
            <span className="font-weight-bold d-block">Referência</span>
            <p>{delivery.address.reference}</p>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <h4>
        Entrega:{' '}
        <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}></span>
      </h4>
      <hr />
      <Row>
        <Col md="4" sm="12" xl="4">
          <span className="font-weight-bold d-block">Metodo</span>
          <p>{delivery.method.toUpperCase()}</p>
        </Col>
        {delivery.method === 'delivery' && (
          <Col md="4" sm="12" xl="4">
            <span className="font-weight-bold d-block">Valor da Entrega</span>
            <p>R$ {Number(delivery.price).toFixed(2)}</p>
          </Col>
        )}
      </Row>
      <hr />
      <Row>
        <Col md="12" sm="12" xl="12">
          <h5 className="font-weight-bold">Disponibilidade</h5>
          <hr />
        </Col>
        <Col md="4" sm="12" xl="4">
          <span className="font-weight-bold d-block">Dia da Entrega</span>
          <p>{formatDiaDaEntrega(availability.from)}</p>
        </Col>
        <Col md="4" sm="12" xl="4">
          <span className="font-weight-bold d-block">Horário da Entrega</span>
          <p>{formatHorarioDaEntrega(availability.from, availability.to)}</p>
        </Col>
      </Row>
      {address}
    </>
  )
}

export default DetalhesDelivery
