import React from 'react'
import { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import CookieUtil from '../../util/cookie'
import { Container, Row } from 'reactstrap'

const TOPIC = 'checkout_made'
const API_ENDPOINT = process.env.REACT_APP_WEB_SOCKET_URL

export default () => {
  useEffect(() => {
    console.log(CookieUtil.get())
    const socket = socketIOClient(API_ENDPOINT, {
      query: {
        authorization: CookieUtil.get(),
      },
    })

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
