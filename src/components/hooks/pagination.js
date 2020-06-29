import React, { useState } from 'react';
import { PaginationItem, PaginationLink, Row, Col, Pagination } from "reactstrap";
import { Link } from 'react-router-dom';

function pageQueryTemplate(page) {
  return `page=${page}`;
}

export function usePagination({ itemsPerPage, currentPage, totalPages }) {
  const [pageParams, setPageParams] = useState(null);

  const paginate = (page) => {
    setPageParams(pageQueryTemplate(page))
  };

  const renderPagination = () => {
    function paginationNumbers() {
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
    }

    return (
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
            {paginationNumbers()}
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
    )
  };

  return {
    renderPagination,
    pageParams,
  };
}