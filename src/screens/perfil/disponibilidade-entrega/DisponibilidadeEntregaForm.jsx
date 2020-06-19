import React from 'react';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row, ListGroupItem, ListGroup } from 'reactstrap';
import { Field, reduxForm, FieldArray } from 'redux-form';

import { getFieldMask, renderInput } from '../../../components/input/InputTemplate';
import validate from './validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FORM_NAME = 'disponibilidadeEntrega'

const renderAvailabilities = ({fields}) => {
  // debugger
  return <ListGroup className="mb-3">
     {fields.map((name, index) => (
    <ListGroupItem key={`disponibilidade-${index}`}>
      <Field name={`${name}.from`} component={renderInput} type="time" label="Começa" required />
      <Field name={`${name}.to`} component={renderInput} type="time" label="Termina" required />
      
      <div className="d-flex justify-content-between">
        <Button onClick={() => fields.remove(index)} color="danger"><FontAwesomeIcon icon="trash" /></Button>
        <Button onClick={() => fields.push({})} color="success"> Novo intervalo</Button>
     </div>
 
    </ListGroupItem>
  ))}
 

</ListGroup>
}
export const DIAS_SEMANA = [
  
  {
    label:'Segunda-feira',
    value: 'monday'
  },

  {
    label:'Terça-feira',
    value: 'tuesday'
  },

  {
    label:'Quarta-feira',
    value: 'wednesday'
  },

  {
    label:'Quinta-feira',
    value: 'thursday'
  },

  {
    label:'Sexta-feira',
    value: 'friday'
  },

  {
    label:'Sábado',
    value: 'saturday'
  },

  {
    label:'Domingo',
    value: 'sunday'
  },


]

const DisponibilidadeEntregaForm = (props) => {
  const { handleSubmit } = props
  const history = useHistory()

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xl="3" sm="12">
            <Field
              component={renderInput}
              type="select"
              name="dayOfWeek"
              label="Dia da semana"
              placeholder="Ex: Segunda-feira"
              required
            >
             {DIAS_SEMANA.map(e => <option key={e.value} value={e.value}> { e.label } </option>)}

            </Field>
          </Col>
          <Col>
            <ListGroup>
              <FieldArray name="availabilities" component={renderAvailabilities} />
            </ListGroup>
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
})(DisponibilidadeEntregaForm)
