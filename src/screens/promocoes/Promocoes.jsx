import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
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
} from 'reactstrap';

import { deletePromocao, fetchPromocoes } from '../../store/promocoes/actions';

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { data, currentPage, totalPages } = useSelector((state) => state.promocoes.response)

  const getParams = () => {
    const { search } = history.location
    return new URLSearchParams(search)
  }

  const updateFilter = () => {
    dispatch(fetchPromocoes(getParams().toString()))
  }

  React.useEffect(updateFilter, [])

  const getDesconto = promocao => {
    if (promocao.discountInPercent) {
      return `${Number(promocao.discountInPercent).toFixed(2)} %`
    } else {
      return `${Number(promocao.discountInPrice).toFixed(2)} R$`
    }
  }

  const getAplicadoEm = promocao => {
    const { product } = promocao

    if (product) {
      return <Link target="blank" to={`/produtos/editar/${product._id}`}>{product.name}</Link>
    }
    return promocao.tags.map(tag => <Badge key={`badge-tag-${tag}`} color="info" className="mx-1">{tag}</Badge>)
  }

  const renderPromocoes = () =>
    data.map((promocao) => (
      <tr key={`promocao-${promocao._id}`}>
        <th scope="row">{getAplicadoEm(promocao)}</th>
        <td>{getDesconto(promocao)}</td>
        <td>{promocao.undefinedTime ? 'Sim' : 'Não'}</td>
        <td>{new Date(promocao.startDate).toLocaleDateString()} {new Date(promocao.startDate).toLocaleTimeString()}</td>
        <td>{new Date(promocao.endDate).toLocaleDateString()} {new Date(promocao.endDate).toLocaleTimeString()}</td>
        <td className="d-flex justify-content-end">
          <Button
            className="mr-2"
            outline
            color="warning"
            tag={Link}
            to={`/promocoes/editar/${promocao._id}`}
          >
            <FontAwesomeIcon icon="pencil-alt" />
          </Button>
          <Button
            outline
            color="danger"
            tag={Link}
            onClick={async () => {
              if (!window.confirm('Tem certeza de que deseja deletar?')) {
                return
              }
              await dispatch(deletePromocao(promocao._id))
              updateFilter()
            }}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </td>
      </tr>
    ))

  const paginate = (page) => {
    const newParams = getParams()
    if (newParams.has('page')) {
      newParams.delete('page')
    }

    newParams.append('page', page)

    history.push({ pathname: routeMatch.path, search: newParams.toString() })
    updateFilter()
  }

  const renderPaginationItems = () => {
    const items = new Array(totalPages).fill(0)

    return items.map((_, index) => (
      <PaginationItem
        active={currentPage === index}
        key={`pagination-item-${index}`}
      >
        <PaginationLink onClick={() => paginate(index)} to="#">
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  return <Container>
    <Row className="mb-2">
      <Col xl="12">
        <Breadcrumb>
          <BreadcrumbItem>Promoções</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col xl="12">
        <div className="d-flex align-self-center justify-content-end">
          <Button outline color="success" tag={Link} to="/promocoes/novo">
            Nova promoção <FontAwesomeIcon icon="plus" />
          </Button>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered size="sm">
          <thead className="thead-light">
            <tr>
              <th>Aplicado em</th>
              <th>Desconto</th>
              <th>Tempo indefido?</th>
              <th>Início</th>
              <th>Final</th>
              <th />
            </tr>
          </thead>
          <tbody>{renderPromocoes()}</tbody>
        </Table>
      </Col>
    </Row>
    <Row>
      <Col className="d-flex justify-content-center">
        <Pagination>
          <PaginationItem>
            <PaginationLink
              disabled={currentPage <= 0}
              first
              onClick={() => paginate(0)}
              to="#"
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink
              previous
              onClick={() => paginate(currentPage - 1)}
              to="#"
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationLink
              disabled={currentPage >= totalPages - 1}
              next
              onClick={() => paginate(currentPage + 1)}
              to="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
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
}
