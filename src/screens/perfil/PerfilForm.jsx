import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Col, Form, Row, ListGroupItem, ListGroup, Alert } from 'reactstrap'
import { change, Field, reduxForm, FieldArray } from 'redux-form'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import validate, { validatePhone } from './validate'

import { getFieldMask, renderInput } from '../../components/input/InputTemplate'

const FORM_NAME = 'perfil'

const renderPhones = ({ fields, meta: { error } }) => {
  debugger
  return <>
    <div className="d-flex justify-content-between">

      <h2>Telefones</h2>
      <Button className="my-2" color="success" onClick={() => fields.push()}>
        <FontAwesomeIcon icon="plus" />
      </Button>
    </div>
    <ListGroup>
      {fields.map((item, index) => (
        <ListGroupItem key={index}>
          <Row>
            <Col xl="10" sm="12">
              <Field
                className="w-100"
                name={item}
                type="text"
                component={renderInput}
                label={`Telefone ${index + 1}`}
              />
            </Col>
            <Col xl="2" sm="12" className="d-flex align-self-center">
              <Button className="text-right" disabled={index === 0} color="danger" onClick={() => fields.remove(index)}>
                <FontAwesomeIcon icon="trash" />
              </Button>
            </Col>
          </Row>


        </ListGroupItem>
      ))}
    </ListGroup>
    {error && <Alert color="danger">{error}</Alert>}
  </>
}

const ProdutoForm = (props) => {
  const { handleSubmit } = props
  const history = useHistory()

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="6" sm="12">
            <Row>
              <Col xl="12" sm="12">
                <Field
                  required
                  component={renderInput}
                  type="text"
                  name="name"
                  label="Nome"
                  placeholder="Ex: Mercado São João"
                />
              </Col>
              <Col xl="12" sm="12">
                <Field
                  required
                  component={renderInput}
                  type="text"
                  name="document"
                  {...getFieldMask("cnpj")}
                  label="CNPJ"
                  placeholder="Ex: 10.539.466/0001-13"
                />
              </Col>
            </Row>
          </Col>
          <Col xl="6" sm="12">
            <Row>
              <Col>
                <FieldArray name="phones" component={renderPhones} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
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

export default reduxForm({ form: FORM_NAME, validate: validate })(ProdutoForm)
