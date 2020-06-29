import React from 'react'
import { Row } from 'reactstrap'
import Col from 'reactstrap/lib/Col'

function DetalhesPagamento({ payment }) {
  const hasExchange = payment.method === 'DINHEIRO'
  const hasDocument = payment.document !== null

  return (
    <>
      <h5 className="font-weight-bold">Pagamento</h5>
      <hr />
      <Row>
        <Col>
          <span className="font-weight-bold d-block">Método</span>
          <p>{payment.method}</p>
        </Col>
        <Col>
          <span className="font-weight-bold d-block">CPF na nota</span>
          <p>{hasDocument ? payment.document : 'Não'}</p>
        </Col>
        {hasExchange && (
          <Col>
            <span className="font-weight-bold d-block">Troco para</span>
            <p>R$ {Number(payment.exchange).toFixed(2)}</p>
          </Col>
        )}
      </Row>
      <hr />
    </>
  )
}

export default DetalhesPagamento
