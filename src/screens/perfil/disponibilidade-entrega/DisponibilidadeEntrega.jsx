import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";

import { deleteDisponibilidadeEntrega, fetchDisponibilidadesEntrega } from "../../../store/disponibilidades-entrega/actions";
import { useEffect } from "react";
import { DIAS_SEMANA } from "./DisponibilidadeEntregaForm";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  debugger
  const { data, currentPage, totalPages } = useSelector((state) => state.disponibilidadesEntrega.response);

  const getParams = () => {
    const { search } = history.location;
    return new URLSearchParams(search);
  };

  const updateFilter = () => {
    dispatch(fetchDisponibilidadesEntrega(getParams().toString()));
  };

  useEffect(() => {
    updateFilter()
  }, [])


  const renderDisponibilidadesEntrega = () =>
    data.map((disponibilidadeEntrega) => (
      <tr key={`disponibilidadeEntrega-${disponibilidadeEntrega._id}`}>


       
        <td>{DIAS_SEMANA.find(q => q.value === disponibilidadeEntrega.dayOfWeek).label}</td>
        {/* <td>{}</td> */}
        <td>{disponibilidadeEntrega.availabilities.map(item => 
          `${ (new Date(item.from).toLocaleTimeString())} - ${(new Date(item.to).toLocaleTimeString())}`).join(" | ") }
        </td>
        <td className="d-flex justify-content-end">

          <Button
            className="mr-2"
            outline
            color="warning"
            tag={Link}
            to={`/perfil/disponibilidades-entrega/editar/${disponibilidadeEntrega._id}`}
          >
            <FontAwesomeIcon icon="pencil-alt" />
           </Button>
          <Button
            outline
            color="danger"
            tag={Link}
            onClick={async () => {
              if (!window.confirm("Tem certeza de que deseja deletar?")) {
                return;
              }
              await dispatch(deleteDisponibilidadeEntrega(disponibilidadeEntrega._id));
              updateFilter();
            }}
          >
            
            <FontAwesomeIcon icon="trash" />
          </Button>
        </td>
      </tr>
    ));



  return (
    <Container>
      <Row className="mb-2">
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem>Disponibilidade de Entrega</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col xl="12">
          <div className="d-flex align-self-center justify-content-end">
            <Button outline color="success" tag={Link} to="/perfil/disponibilidades-entrega/novo">
              Nova disponibilidade de entrega <FontAwesomeIcon icon="plus" />
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered size="sm">
            <thead className="thead-light">
              <tr>
                <th>Dia da semana</th>
                <th>Horários</th>
                
                <th />
              </tr>
            </thead>
            <tbody>{renderDisponibilidadesEntrega()}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
