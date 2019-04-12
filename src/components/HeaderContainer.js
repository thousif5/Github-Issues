import React, { Component } from "react";
import "../App.css";

export class HeaderContainer extends Component {
  allIssues = () => {
    this.props.issuesHandler();
  }

  openButton = () => {
    this.props.stateHandler('open');
  };

  closeButton = () => {
    this.props.stateHandler('close');
  };

  render() {
    return (
      <div>
        <div className="title">
          <a href="https://github.com/freeCodeCamp/freeCodeCamp">
            freeCodeCamp/<strong>freeCodeCamp</strong>
          </a>
        </div>
        <div className="issues-border">
          <div onClick = {this.allIssues} className="issues-tab">
            <i style={{ fontSize: "24px" }} className="fa">
              &#xf06a;&nbsp;
            </i>
            <p>issues</p>
          </div>
          <div>
            <button onClick={this.openButton}>
              open {this.props.openState}
            </button>
          </div>
          <div>
            <button onClick={this.closeButton}>closed {this.props.closeState}</button>
          </div>
        </div>
        <div className = 'dropDown-list'>
          <select>

          </select>
        </div>
      </div>
    );
  }
}

export default HeaderContainer;
