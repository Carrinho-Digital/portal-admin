import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';

import { getDisponibilidadeEntregaById, updateDisponibilidadeEntrega, limparForm } from '../../../store/disponibilidades-entrega/actions';
import DisponibilidadeEntregaForm from './DisponibilidadeEntregaForm';
import moment from 'moment';

const DisponibilidadeEntregaAlterar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const disponibilidadeEntregaAtual = useSelector((state) => state.disponibilidadesEntrega.disponibilidadeEntregaAtual);

  React.useEffect(() => {
    const getDisponibilidadeEntregaToEdit = async () => {
      
      await dispatch(limparForm())
      const disponibilidadeEntregaExists = await dispatch(getDisponibilidadeEntregaById(id));

      if (!disponibilidadeEntregaExists) {
        history.push("/disponibilidades-entrega");
      }
    };

    getDisponibilidadeEntregaToEdit();
  }, [id, dispatch, history]);

  const handleSubmit = async (e) => {
    await dispatch(updateDisponibilidadeEntrega(e));
    history.goBack();
  };

  if (!disponibilidadeEntregaAtual || !disponibilidadeEntregaAtual.availabilities || !disponibilidadeEntregaAtual.availabilities.length) {
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

  
  
  disponibilidadeEntregaAtual.availabilities = disponibilidadeEntregaAtual.availabilities.map(item => {
    const from = moment(new Date(item.from)).format('HH:mm')
    const to = moment(new Date(item.to)).format('HH:mm')

    return {
      to,
      from
  }
  })
  return (
    <Container>
      <Row>
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem tag={Link} to="/perfil/disponibilidades-entrega">
                Disponibilidade de entrega
            </BreadcrumbItem>
            <BreadcrumbItem>Alterar</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <DisponibilidadeEntregaForm initialValues={disponibilidadeEntregaAtual} onSubmit={handleSubmit} />
    </Container>
  );
};

export default DisponibilidadeEntregaAlterar;
