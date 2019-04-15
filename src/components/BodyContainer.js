import React, { Component } from 'react';
import './BodyContainer.css';

export class BodyContainer extends Component {
  render() {
    return (
      <div>
      <div className="title">
          <a href="https://github.com/freeCodeCamp/freeCodeCamp">
            freeCodeCamp/<strong>freeCodeCamp</strong>
          </a>
        </div>
        <div className="issues-border">
          <div onClick={this.allIssues} className="issues-tab">
            <i style={{ fontSize: "24px" }} className="fa">
              &#xf06a;&nbsp;
            </i>
            <p>issues</p>
          </div>
        </div>
      </div>
    )
  }
}

export default BodyContainer
