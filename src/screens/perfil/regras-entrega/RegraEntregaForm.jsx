import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { getFieldMask, renderInput } from '../../../components/input/InputTemplate';
import validate from './validate';

const FORM_NAME = 'regraEntrega'

const RegraEntregaForm = (props) => {
  const { handleSubmit } = props
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="3" sm="12">
            <Field
              component={renderInput}
              type="text"
              {...getFieldMask("decimal", 2)}
              name="distanceInKm"
              label="Distância em Km"
              placeholder="Ex: 5 Km"
            />
          </Col>
          <Col xl="3" sm="12">
            <Field
              component={renderInput}
              type="checkbox"
              name="defaultRule"
              label="Regra de entrega padrão"
            />
          </Col>
          <Col xl="3" sm="12">
            <Field
              component={renderInput}
              type="text"
              name="price"
              label="Preço da entrega"
              {...getFieldMask("moedaBRL", 2)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-row-reverse">
            <Button outline type="submit" color="success">
              Salvar
            </Button>
            <Button
              onClick={history.goBack}
              className="mr-2"
              outline
              type="button"
              color="secondary"
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default reduxForm({
  form: FORM_NAME,
  validate
})(RegraEntregaForm)
