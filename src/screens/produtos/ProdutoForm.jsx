import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row } from 'reactstrap';
import { change, Field, reduxForm } from 'redux-form';

import { getFieldMask, renderInput } from '../../components/input/InputTemplate';
import { renderMultiSelect } from '../../components/input/MultiSelectTemplate';
import { searchTags, createTag } from '../../store/produtos/actions';

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

const FORM_NAME = "produto"

const ProdutoForm = props => {
    const { handleSubmit } = props
    const history = useHistory();
    const dispatch = useDispatch();
    const tags = useSelector(state => state.produtos.tags)
    const { values: currentValues } = useSelector(state => state.form[FORM_NAME])

    useEffect(() => {
        dispatch(searchTags())
    }, [])

    return <Form onSubmit={handleSubmit}>
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
                <Field
                    allowCreate="onFilter"
                    required
                    defaultValue={[]}
                    component={renderMultiSelect}
                    data={tags}
                    name="tags"
                    label="Tags"
                    placeholder="Ex: 5"
                    onBlur={e => {
                        dispatch(change(FORM_NAME, 'tags', e))
                    }}
                    onCreate={name => {
                        dispatch(createTag(name))
                        debugger
                        var tags = (currentValues && currentValues.tags) ? currentValues.tags : []
                        dispatch(change(FORM_NAME, 'tags', [...tags, name]))
                    }}
                />
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
    </Form >
}

export default reduxForm({ form: FORM_NAME })(ProdutoForm)