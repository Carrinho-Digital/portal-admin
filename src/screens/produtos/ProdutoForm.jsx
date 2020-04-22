import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { getFieldMask, renderInput } from '../../components/input/InputTemplate';
import { renderMultiSelect } from '../../components/input/MultiSelectTemplate';
import validate from './validate';
import { Multiselect } from 'react-widgets';

const UnidadeMedidaOptions = () => {
    const unidades = ['kg', 'g', 'm', 'mm', 'cm', 'm2', 'm3', 'un']

    return unidades.map((item, key) => <option key={`unit-${item}-${key}`} value={item}>{item.toUpperCase()}</option>)
}

const InativoOptions = () => {
    return <>
        <option value={false}>Não</option>
        <option value={true}>Sim</option>
    </>
}

const ProdutoForm = props => {
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
                            {/* <Field
                                onBlur={undefined}
                                required
                                allowCreate="onFilter"
                                defaultValue={[]}
                                component={renderMultiSelect}
                                data={['arroz', 'sabão', 'carne']}
                                name="tags"
                                label="Tags"
                                placeholder="Ex: 5"
                            /> */}
                            <div className="form-group">
                                <label>Tags</label>
                                <Field
                                    name="tags"
                                    component={Multiselect}
                                    defaultValue={[]}
                                    onBlur={() => props.onBlur()}
                                    data={['arroz', 'sabão', 'carne']} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} {...getFieldMask("moedaBRL", 2)} type="text" name="buyPrice" label="Preço de compra" placeholder="Ex: R$ 8,00" />
                        </Col>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} type="select" name="unit" label="Unidade de medida" placeholder="Ex: UN">
                                <UnidadeMedidaOptions />
                            </Field>
                        </Col>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} {...getFieldMask("decimal", 2)} type="text" name="size" label="Tamanho" placeholder="Ex: 5,00" />
                        </Col>
                        <Col xl="3" sm="12">
                            <Field required component={renderInput} type="select" name="inactive" label="Inativo" placeholder="Ex: Não">
                                <InativoOptions />
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-row-reverse">
                            <Button outline type="submit" color="success">
                                Salvar
                            </Button>
                            <Button onClick={history.goBack} className="mr-2" outline type="button" color="secondary">
                                Voltar
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Form >
    </Container>
}

export default reduxForm({ form: "produto" })(ProdutoForm)