import React from 'react'
import { Row } from 'reactstrap'
import Col from 'reactstrap/lib/Col'

function DetalhesCliente({ user }) {
  return (
    <>
      <h5 className="font-weight-bold">Cliente</h5>
      <hr />
      <Row>
        <Col>
          <span className="font-weight-bold d-block">Nome</span>
          <p>{user.name.toUpperCase()}</p>
        </Col>
        <Col>
          <span className="font-weight-bold d-block">Email</span>
          <p>{user.email}</p>
        </Col>
        <Col>
          <span className="font-weight-bold d-block">Telefones</span>
          <p>{user.phones.join(', ')}</p>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default DetalhesCliente
