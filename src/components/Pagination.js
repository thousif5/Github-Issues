import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'
class Pagination extends Component {
    
   render() {
       return (
           <ReactPaginate className="pages" previousLabel={'previous'} nextLabel={'next'} pageCount={2} onPageChange={this.props.handlePage} activeClassName={"active-page"} containerClassName="pagination" forcePage = {this.props.page}>
           </ReactPaginate>
       );
   }
}

export default Pagination;