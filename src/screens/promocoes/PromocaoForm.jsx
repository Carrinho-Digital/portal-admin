import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row } from 'reactstrap';
import { change, Field, reduxForm } from 'redux-form';

import { getFieldMask, renderInput } from '../../components/input/InputTemplate';
import { renderMultiSelect } from '../../components/input/MultiSelectTemplate';
import { searchTags, createTag } from '../../store/promocoes/actions';

const FORM_NAME = "promocao"

const PromocaoForm = props => {
    const { handleSubmit } = props
    const history = useHistory();
    const dispatch = useDispatch();
    const tags = useSelector(state => state.promocoes.tags)
    const { values: currentValues } = useSelector(state => state.form[FORM_NAME])

    useEffect(() => {
        dispatch(searchTags())
    }, [])

    const undefinedTimeChanged = e => {
        dispatch(change(FORM_NAME, 'startDate', null))
        dispatch(change(FORM_NAME, 'endDate', null))
    }

    return <Form onSubmit={handleSubmit}>
        <Row>
            <Col xl="3" sm="12">
                <Field required component={renderInput} {...getFieldMask("percentual")} type="text" name="discountInPercent" label="% de desconto" placeholder="Ex: 10%" />
            </Col>
            <Col xl="9" sm="12">
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
                        var tags = (currentValues && currentValues.tags) ? currentValues.tags : []
                        dispatch(change(FORM_NAME, 'tags', [...tags, name]))
                    }}
                />
            </Col>
        </Row>
        <Row>
            <Col xl="3" sm="12">
                <Field onChange={undefinedTimeChanged} component={renderInput} type="checkbox" name="undefinedTime" label="Tempo indefinido" placeholder="Ex: Não"/>
            </Col>
            <Col xl="3" sm="12">
                <Field disabled={currentValues.undefinedTime} required component={renderInput} type="datetime-local" name="startDate" label="Início" placeholder="Ex: 12/12/2020 12:00" />
            </Col>
            <Col xl="3" sm="12">
                <Field disabled={currentValues.undefinedTime} required component={renderInput} type="datetime-local" name="endDate" label="Final" placeholder="Ex: 12/12/2020 18:00" />
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

export default reduxForm({ form: FORM_NAME })(PromocaoForm)