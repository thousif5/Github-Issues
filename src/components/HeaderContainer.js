import React, { Component } from 'react';
import '../App.css';

export class HeaderContainer extends Component {
  render() {
    return (
      <div>
        <div className = 'title'>
          <a href = 'https://github.com/freeCodeCamp/freeCodeCamp'>freeCodeCamp/<strong>freeCodeCamp</strong></a>
        </div>
        <div className = 'issues-border'>
        <div className = 'issues-tab'>
        <i style={{fontSize:'24px'}} className="fa">&#xf06a;&nbsp;</i>
          <p>issues</p>
        </div>
        </div>
      </div>
    )
  }
}

export default HeaderContainer
