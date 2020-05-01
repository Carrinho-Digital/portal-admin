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
  deleteProduto,
  fetchProdutos,
  changeInactive,
} from '../../store/produtos/actions'

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { data, currentPage, totalPages, itemsPerPage } = useSelector(
    (state) => state.produtos.response,
  )

  const getParams = () => {
    const { search } = history.location
    return new URLSearchParams(search)
  }

  const updateFilter = () => {
    dispatch(fetchProdutos(getParams().toString()))
  }

  React.useEffect(updateFilter, [])

  const renderCardProducts = () =>
    data.map((product) => (
      <>
        <Col sm="12" md="12" xl="12" className="mb-4">
          <div className="card border-light shadow">
            <div class="row">
              <div class="col-md-2">
                <img
                  src={
                    product.images.length > 0
                      ? product.images[0]
                      : 'http://via.placeholder.com/190x190'
                  }
                  width="190"
                  alt={product.name}
                />
              </div>
              <div class="col-md-8 pl-4">
                <div className="card-body py-3">
                  <div className="d-flex">
                    <div>
                      <h5 className="card-title">{product.name}</h5>
                      <h6 className="card-subtitle text-muted">
                        R$ {Number(product.sellPrice).toFixed(2)}{' '}
                        {product.unit ? product.unit.toUpperCase() : ' '}
                      </h6>
                      <small className="font-weight-bold">{product.sku}</small>
                    </div>
                    <div className="ml-5">
                      <p>
                        <span class="d-block font-weight-bold">Quantidade</span>
                        <span className="text-muted">{product.amount}</span>
                      </p>
                    </div>
                    <div className="ml-5">
                      <p>
                        <span class="d-block font-weight-bold">
                          Preço de Compra
                        </span>
                        <span className="text-muted">
                          {product.buyPrice
                            ? `R$ ${Number(product.buyPrice).toFixed(2)}`
                            : '--'}
                        </span>
                      </p>
                    </div>
                    <div className="ml-5">
                      <div className="form-group">
                        <span class="d-block font-weight-bold">Inativo</span>
                        <select
                          className="form-control"
                          value={product.inactive}
                          onChange={async () => {
                            await dispatch(
                              changeInactive(product._id, !product.inactive),
                            )
                            updateFilter()
                          }}
                        >
                          <option value={true}>Sim</option>
                          <option value={false}>Não</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="card-text my-2">{product.description}</p>
                  {product.tags.map((tag) => (
                    <span class="badge badge-pill badge-primary mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div class="col-md-2">
                <div className="card-body">
                  <Button
                    disabled={product.inactive}
                    className="mr-2"
                    outline
                    color="warning"
                    tag={Link}
                    to={`/produtos/editar/${product._id}`}
                  >
                    <FontAwesomeIcon icon="pencil-alt" />
                  </Button>

                  <Button
                    outline
                    color="danger"
                    tag={Link}
                    onClick={async () => {
                      if (
                        !window.confirm('Tem certeza de que deseja deletar?')
                      ) {
                        return
                      }
                      await dispatch(deleteProduto(product._id))
                      updateFilter()
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </>
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

  return (
    <Container>
      <Row className="mb-2">
        <Col xl="12">
          <Breadcrumb>
            <BreadcrumbItem>Produtos</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col xl="12">
          <div className="d-flex mb-3">
            <div className="form-group mb-0 flex-grow-1 mr-2">
              <input
                placeholder="Busque pelo nome do produto ou sku..."
                type="text"
                name="search"
                className="form-control"
              />
            </div>
            <Button
              className="mr-2"
              outline
              color="info"
              tag={Link}
              to="/produtos/novo"
            >
              Buscar <FontAwesomeIcon icon="search" />
            </Button>

            <Button outline color="success" tag={Link} to="/produtos/novo">
              Novo produto <FontAwesomeIcon icon="plus" />
            </Button>
          </div>
          <div>
            <p>
              <span className="font-weight-bold">Total de produtos: </span>
              <span class="text-muted font-italic">
                {itemsPerPage * totalPages}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <Row>{renderCardProducts()}</Row>
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
  )
}
