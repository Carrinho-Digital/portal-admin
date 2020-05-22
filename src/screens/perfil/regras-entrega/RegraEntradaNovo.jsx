import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';

import { insertRegraEntrega } from '../../store/regras-entrega/actions';
import RegraEntregaForm from './RegraEntregaForm';

const RegraEntregaNovo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (e) => {
    await dispatch(insertRegraEntrega(e))
    history.goBack()
  }

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/regras-entrega">
              Regras de entrega
            </BreadcrumbItem>
            <BreadcrumbItem>Nova regra de entrada</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <RegraEntregaForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default RegraEntregaNovo
