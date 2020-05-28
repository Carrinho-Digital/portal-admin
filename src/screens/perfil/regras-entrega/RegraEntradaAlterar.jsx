import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';

import { getRegraEntradaById, updateRegraEntrada } from '../../store/regras-entrada/actions';
import RegraEntradaForm from './RegraEntradaForm';

const RegraEntradaAlterar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const regraEntradaAtual = useSelector((state) => state.regrasEntrada.regraEntradaAtual);

  React.useEffect(() => {
    const getProductToEdit = async () => {
      const productExists = await dispatch(getRegraEntradaById(id));

      if (!productExists) {
        history.push("/regras-entrada");
      }
    };

    getProductToEdit();
  }, [id, dispatch, history]);

  const handleSubmit = async (e) => {
    await dispatch(updateRegraEntrada(e));
    history.goBack();
  };

  if (!regraEntradaAtual) {
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
            <BreadcrumbItem tag={Link} to="/regras-entrada">
              Regras de entrega
            </BreadcrumbItem>
            <BreadcrumbItem>Alterar</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <RegraEntradaForm initialValues={regraEntradaAtual} onSubmit={handleSubmit} />
    </Container>
  );
};

export default RegraEntradaAlterar;
