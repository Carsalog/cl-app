import React from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";

const Pagination = props => {

  const {amount, pageSize, currentPage, onPageChange} = props;

  const pageCount = Math.ceil(amount / pageSize);

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
  <nav aria-label="Page navigation example">
    <ul className="pagination">
      {pages.map(page => (
        <li className={page === currentPage ? "page-item active" : "page-active"} key={"page_"+page}>
          <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
        </li>
      ))}
    </ul>
  </nav>);
};

Pagination.propTypes = {
  amount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired
};


 
export default Pagination;