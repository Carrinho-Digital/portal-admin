import "./login.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import { renderInput } from "../../components/input/InputTemplate";
import validate from "./validate";

const ContaLoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <Form className="form-signin h-100 d-flex" onSubmit={handleSubmit}>
      <Card className="align-self-center shadow-lg">
        <CardBody>
          <Row>
            <Col className="text-center">
              <img
                src="/logo_letreiro_png.png"
                alt="carrinho_digital.png"
                width="250"
              />
            </Col>
            <Col sm="12">
              <Field
                required
                dotNotShowRequiredChar
                component={renderInput}
                type="email"
                name="email"
                label="E-mail"
                placeholder="joão@meuemail.com"
              />
            </Col>
            <Col sm="12">
              <Field
                required
                dotNotShowRequiredChar
                component={renderInput}
                type="password"
                name="password"
                label="Senha"
                placeholder="********"
              />
            </Col>
            <Col className="text-center">
              <Button type="submit" color="primary" block>
                Login
              </Button>
              <hr />
              <div className="mb-2">
                <Link to="/conta/esqueci-senha">
                  Ainda não tem conta? Cadastre-se
                </Link>
              </div>
              <div>
                <Link to="/conta/login">Eu esqueci minha senha :(</Link>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Form>
  );
};

export default reduxForm({
  validate,
  form: "login",
})(ContaLoginForm);
