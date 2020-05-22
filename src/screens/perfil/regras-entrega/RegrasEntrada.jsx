import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  Badge,
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

import { deleteRegraEntrega, fetchRegrasEntrega } from "../../store/regrasEntrega/actions";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { data, currentPage, totalPages } = useSelector((state) => state.regrasEntrega.response);

  const getParams = () => {
    const { search } = history.location;
    return new URLSearchParams(search);
  };

  const renderRegrasEntrega = () =>
    data.map((regraEntrega) => (
      <tr key={`regraEntrega-${regraEntrega._id}`}>
        <th scope="row">{Number(regraEntrada.distanceInKm).toFixed(2)}</th>
        <td>{regraEntrega.defaultRule ? "Sim" : "Não"}</td>
        <td>{`${Number(regraEntrega.price).toFixed(2)} R$`}</td>
        <td className="d-flex justify-content-end">
          <Button
            className="mr-2"
            outline
            color="warning"
            tag={Link}
            to={`/regras-entrega/editar/${regraEntrega._id}`}
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
              await dispatch(deleteRegraEntrega(regraEntrega._id));
              updateFilter();
            }}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </td>
      </tr>
    ));

  const paginate = (page) => {
    const newParams = getParams();
    if (newParams.has("page")) {
      newParams.delete("page");
    }

    newParams.append("page", page);

    history.push({ pathname: routeMatch.path, search: newParams.toString() });
    updateFilter();
  };

  const renderPaginationItems = () => {
    const items = new Array(totalPages).fill(0);

    return items.map((_, index) => (
      <PaginationItem
        active={currentPage === index}
        key={`pagination-item-${index}`}
      >
        <PaginationLink tag={Link} onClick={() => paginate(index)} to="#">
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Container>
      <Row className="mb-2">
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem>Regras de entrada</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col xl="12">
          <div className="d-flex align-self-center justify-content-end">
            <Button outline color="success" tag={Link} to="/regras-entrada/novo">
              Nova regra de entrega <FontAwesomeIcon icon="plus" />
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered size="sm">
            <thead className="thead-light">
              <tr>
                <th>Distância (Km)</th>
                <th>Regra padrão</th>
                <th>Preço</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderRegrasEntrega()}</tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Pagination>
            <PaginationItem>
              <PaginationLink
                tag={Link}
                disabled={currentPage <= 0}
                first
                onClick={() => paginate(0)}
                to="#"
              />
            </PaginationItem>
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                tag={Link}
                previous
                onClick={() => paginate(currentPage - 1)}
                to="#"
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationLink
                tag={Link}
                disabled={currentPage >= totalPages - 1}
                next
                onClick={() => paginate(currentPage + 1)}
                to="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                tag={Link}
                disabled={currentPage >= totalPages - 1}
                last
                onClick={() => paginate(totalPages - 1)}
                to="#"
              />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};
