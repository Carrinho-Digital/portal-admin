import React from 'react'
import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'

import { Container, Row } from 'reactstrap'

const TOPIC = 'checkout_made'
const API_ENDPOINT = 'http://localhost:8001'

export default () => {
  useEffect(() => {
    const socket = socketIOClient(API_ENDPOINT)

    socket.on(TOPIC, (notification) => console.log(notification))
  }, [])

  return (
    <Container>
      <Row>
        <h1>Vendas</h1>
      </Row>
    </Container>
  )
}
