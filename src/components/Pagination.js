import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css'

let pre = '';
let nex = '';
class Pagination extends Component {
   render() {
       (this.props.page > 0 ? pre = '<' : pre = '');
       (this.props.page > 0 ? nex = '' : nex = '>')
       return (
           <ReactPaginate className="pages" previousLabel={pre} nextLabel={nex} pageCount={2} onPageChange={this.props.handlePage} activeClassName={"active-page"} containerClassName="pagination" forcePage = {this.props.page}>
           </ReactPaginate>
       );
   }
}

export default Pagination;