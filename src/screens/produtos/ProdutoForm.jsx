import React from 'react';
import { Button, Card, CardBody, Col, Form, Row, Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { getFieldMask, renderInput } from '../../components/input/InputTemplate';
import validate from './validate';
import { useHistory } from 'react-router-dom';

const ContaLoginForm = props => {
    const { handleSubmit } = props
    const history = useHistory();

    return <Container>
        <Form onSubmit={handleSubmit}>
            <Card>
                <CardBody>
                    <Row>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} type="text" name="name" label="Nome" placeholder="Ex: Arroz" />
                        </Col>
                        <Col xl="6" sm="12">
                            <Field required component={renderInput} type="text" name="description" label="Descrição" placeholder="Ex: Marca X 5Kg" />
                        </Col>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} {...getFieldMask("decimal", 2)} type="text" name="amount" label="Quantidade" placeholder="Ex: 5" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} {...getFieldMask("moedaBRL", 2)} type="text" name="sellPrice" label="Preço de venda" placeholder="Ex: R$ 12,00" />
                        </Col>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} type="text" name="sku" label="SKU" placeholder="Ex: 79846531321200148" />
                        </Col>
                        <Col xl="6" sm="12">
                            <Field required component={renderInput} type="text" name="tags" label="Tags" placeholder="Ex: 5" />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-row-reverse">
                            <Button outline type="submit" color="success">
                                Salvar
                            </Button>
                            <Button className="mr-2" outline type="button" color="secondary">
                                Voltar
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form >
    </Container>
}

export default reduxForm({ validate, form: "produto" })(ContaLoginForm)