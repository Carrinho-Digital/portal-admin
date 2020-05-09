import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row } from "reactstrap";
import { change, Field, reduxForm } from "redux-form";

import {
  getFieldMask,
  renderInput,
} from "../../components/input/InputTemplate";
import { renderMultiSelect } from "../../components/input/MultiSelectTemplate";
import {
  searchTags,
  createTag,
  searchProducts,
} from "../../store/promocoes/actions";
import { renderComboBox } from "../../components/input/DropdownListTemplate";
import validate from "./validate";

const FORM_NAME = "promocao";

const PromocaoForm = (props) => {
  const { handleSubmit } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { tags, produtos } = useSelector((state) => state.promocoes);
  const { values: currentValues } = useSelector(
    (state) => state.form[FORM_NAME]
  );

  useEffect(() => {
    dispatch(searchTags());
    dispatch(searchProducts());
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xl="3" sm="12" className="d-flex align-self-center">
          <Field
            component={renderInput}
            type="checkbox"
            name="promotionPerPrice"
            label="Promoção por valor"
          />
        </Col>
        {!currentValues.promotionPerPrice ? (
          <Col xl="3" sm="12">
            <Field
              required
              component={renderInput}
              {...getFieldMask("percentual")}
              type="text"
              name="discountInPercent"
              label="% de desconto"
              placeholder="Ex: 10%"
            />
          </Col>
        ) : (
          <Col xl="3" sm="12">
            <Field
              required
              component={renderInput}
              {...getFieldMask("moedaBRL")}
              type="text"
              name="discountInPrice"
              label="R$ de desconto"
              placeholder="Ex: R$2,00"
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col xl="3" sm="12" className="d-flex align-self-center">
          <Field
            component={renderInput}
            type="checkbox"
            name="promotionPerProduct"
            label="Promoção por produto"
          />
        </Col>
        <Col xl="6" sm="12">
          {!currentValues.promotionPerProduct ? (
            <Field
              allowCreate="onFilter"
              defaultValue={[]}
              component={renderMultiSelect}
              data={tags}
              name="tags"
              label="Tags"
              placeholder="Ex: Carnes"
              onBlur={(e) => {
                dispatch(change(FORM_NAME, "tags", e));
              }}
              onCreate={(name) => {
                dispatch(createTag(name));
                var tags = currentValues.tags || [];
                dispatch(change(FORM_NAME, "tags", [...tags, name]));
              }}
            />
          ) : (
            <Field
              component={renderComboBox}
              data={produtos}
              textField="name"
              valueField="_id"
              name="productId"
              label="Produto"
              placeholder="Ex: Carne bovina"
              filter="startsWith"
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="3" sm="12" className="d-flex align-self-center">
          <Field
            component={renderInput}
            type="checkbox"
            name="undefinedTime"
            label="Tempo indefinido"
            placeholder="Ex: Não"
          />
        </Col>
        {!currentValues.undefinedTime && (
          <>
            <Col xl="3" sm="12">
              <Field
                component={renderInput}
                type="datetime-local"
                name="startDate"
                label="Início"
                placeholder="Ex: 12/12/2020 12:00"
              />
            </Col>
            <Col xl="3" sm="12">
              <Field
                component={renderInput}
                type="datetime-local"
                name="endDate"
                label="Final"
                placeholder="Ex: 12/12/2020 18:00"
              />
            </Col>
          </>
        )}
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
            color="light"
          >
            Voltar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default reduxForm({ form: FORM_NAME, validate: validate })(PromocaoForm);
