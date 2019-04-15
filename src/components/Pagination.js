import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
class Pagination extends Component {
   render() {
       return (
           <ReactPaginate className="pages" previousLabel={'previous'} nextLabel={'next'} pageCount={100} onPageChange={this.props.handlePage} activeClassName={"active-page"} containerClassName="pagination">
           </ReactPaginate>
       );
   }
}

export default Pagination;