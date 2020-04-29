import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import {
  Button,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  BreadcrumbItem,
  Breadcrumb,
} from 'reactstrap'

import {
  deletePromocao,
  fetchPromocoes,
  changeInactive,
} from '../../store/promocoes/actions'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { data, currentPage, totalPages } = useSelector(
    (state) => state.promocoes.response,
  )

  const getParams = () => {
    const { search } = history.location
    return new URLSearchParams(search)
  }

  const updateFilter = () => {
    dispatch(fetchPromocoes(getParams().toString()))
  }

  React.useEffect(updateFilter, [])

  const renderPromocoes = () =>
    data.map((promocao) => (
      <tr
        className={promocao.inactive ? 'bg-secondary' : ''}
        key={`promocao-${promocao._id}`}
      >
        <th scope="row">{promocao.name}</th>
        <td>{promocao.amount}</td>
        <td>{promocao.unit ? promocao.unit.toUpperCase() : '--'}</td>
        <td align="right">R$ {Number(promocao.sellPrice).toFixed(2)}</td>
        <td align="center">
          <input
            type="checkbox"
            checked={promocao.inactive}
            onChange={async ({ target }) => {
              await dispatch(changeInactive(promocao._id, !promocao.inactive))
              updateFilter()
            }}
          />
        </td>
        <td className="d-flex justify-content-end">
          <Button
            disabled={promocao.inactive}
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
            disabled={promocao.inactive}
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
          <BreadcrumbItem>Promocoes</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col xl="12">
        <div className="d-flex align-self-center justify-content-end">
          <Button outline color="success" tag={Link} to="/promocoes/novo">
            Novo promocao <FontAwesomeIcon icon="plus" />
          </Button>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered size="sm">
          <thead className="thead-light">
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th className="text-right">$ Venda</th>
              <th className="text-center">Inativo</th>
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
