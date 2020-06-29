import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'

import Venda from './Venda'
import { usePagination } from '../../components/hooks/pagination'
import { useSocketListener } from '../../components/hooks/socket'
import { fetchVendas } from '../../store/vendas/actions'

const TOPIC = 'checkout_made'

export default function Vendas() {
  const dispatch = useDispatch()
  const [vendasRealtime, setVendasRealtime] = useState([])
  const receivedData = useSocketListener(TOPIC)

  const { vendas } = useSelector((state) => state.vendas)

  const { renderPagination, pageParams } = usePagination(vendas)

  useEffect(() => {
    dispatch(fetchVendas(pageParams))
  }, [dispatch, pageParams])

  useEffect(() => {
    if (receivedData) {
      console.log(receivedData.user)
      setVendasRealtime((preVendas) => [
        { new: true, ...receivedData },
        ...preVendas,
      ])
    }
  }, [receivedData])

  return (
    <Container>
      <Row className="mb-2">
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem>Vendas</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        {vendasRealtime.map((venda) => (
          <Venda key={venda._id} venda={venda} isRealtime />
        ))}

        {vendas.data.map((venda) => (
          <Venda key={venda._id} venda={venda} />
        ))}
      </Row>
      {renderPagination()}
    </Container>
  )
}
