import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';

import { getRegraEntregaById, updateRegraEntrega } from '../../../store/regras-entrega/actions';
import RegraEntregaForm from './RegraEntregaForm';

const RegraEntregaAlterar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const regraEntregaAtual = useSelector((state) => state.regrasEntrega.regraEntregaAtual);

  React.useEffect(() => {
    const getProductToEdit = async () => {
      const productExists = await dispatch(getRegraEntregaById(id));

      if (!productExists) {
        history.push("/regras-entrega");
      }
    };

    getProductToEdit();
  }, [id, dispatch, history]);

  const handleSubmit = async (e) => {
    await dispatch(updateRegraEntrega(e));
    history.goBack();
  };

  if (!regraEntregaAtual) {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Carregando...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/regras-entrega">
              Regras de entrega
            </BreadcrumbItem>
            <BreadcrumbItem>Alterar</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <RegraEntregaForm initialValues={regraEntregaAtual} onSubmit={handleSubmit} />
    </Container>
  );
};

export default RegraEntregaAlterar;
