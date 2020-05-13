import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row, ListGroupItem, ListGroup } from 'reactstrap';

import { getPerfil, updatePerfil } from '../../store/perfil/actions';
import PerfilForm from './PerfilForm';
import CookieUtil from '../../util/cookie';

const PerfilAlterar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [perfil, setPerfil] = useState(null)

  React.useEffect(() => {
    async function init() {
      await dispatch(getPerfil())
      setPerfil(CookieUtil.getUserInfo())
    }

    init()
  }, []);

  const handleSubmit = async (e) => {
    await dispatch(updatePerfil(e));
    history.goBack();
  };

  if (!perfil) {
    return <Container>
      <Row>
        <Col>
          <h1>Carregando...</h1>
        </Col>
      </Row>
    </Container>
  }

  return (
    <>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem active>
              Perfil
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PerfilForm initialValues={perfil} onSubmit={handleSubmit} />
    </>

  );
};

export default PerfilAlterar;
