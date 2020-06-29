import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';

import { insertDisponibilidadeEntrega } from '../../../store/disponibilidades-entrega/actions';
import DisponibilidadeEntregaForm from './DisponibilidadeEntregaForm';

const DisponibilidadeEntregaNovo = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (e) => {
    await dispatch(insertDisponibilidadeEntrega(e))
    history.goBack()
  }

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/perfil/disponibilidades-entrega">
              Disponibilidades de entrega
            </BreadcrumbItem>
            <BreadcrumbItem>Nova disponibilidade de entrada</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <DisponibilidadeEntregaForm onSubmit={handleSubmit} initialValues = {{ availabilities:[{}] }} />
    </Container>
  )
}

export default DisponibilidadeEntregaNovo
