import React, { Component } from "react";
import { auth, signOut } from "./auth";
import "../App.css";

let name = sessionStorage.getItem("name");
export class HeaderContainer extends Component {
  state = {
    data: "sign in"
  };

  importToken = () => {
    if (this.state.data === "sign in") {
      auth();
      this.setState({
        data: "sign out"
      });
    }
    if (this.state.data === "sign out") {
      signOut();
      this.setState({
        data: "sign in"
      });
    }
  };

  allIssues = () => {
    this.props.issuesHandler();
  };

  openButton = () => {
    this.props.openStateHandler("open");
  };

  closeButton = () => {
    this.props.closeStateHandler("close");
  };

  dropDown = e => {
    this.props.labelsHandler(e);
  };

  authorDown = e => {
    this.props.authorsHandler(e);
  };

  sortData = e => {
    this.props.dataToSort(e);
  };

  searchInput = e => {
    this.props.searchData(e);
  };

  render() {
    return (
      <div>
        <div className="title">
          <a href="https://github.com/thousif7/test-issues">
            thousif7/<strong>test-issues</strong>
          </a>
          <input
            onKeyUp={this.searchInput}
            type="text"
            placeholder="Search.."
          />
          <p>{this.state.data === "sign out" ? name : null}</p>
          <button onClick={this.importToken} className="signIn">
            {this.state.data}
          </button>
        </div>
        <div className="issues-border">
          <div onClick={this.allIssues} className="issues-tab">
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
            <button onClick={this.closeButton}>
              closed {this.props.closeState}
            </button>
          </div>
          <div className="dropDown-list">
            <select onChange={this.dropDown} defaultValue="Labels">
              <option value="Labels" disabled>
                &nbsp;&nbsp;Labels
              </option>
              {this.props.labels.map(label => (
                <option>{label}</option>
              ))}
            </select>
          </div>
          <div className="author-drop">
            <select onChange={this.authorDown} defaultValue="Authors">
              <option value="Authors" disabled>
                &nbsp;&nbsp;Authors
              </option>
              {this.props.authors.map(author => (
                <option>{author}</option>
              ))}
            </select>
          </div>
          <div className="sortDrop">
            <select onChange={this.sortData} defaultValue="Sort">
              <option value="Sort" disabled>
                &nbsp;&nbsp;Sort
              </option>
              <option>Oldest</option>
              <option>Newest</option>
              <option>Recently Upadted</option>
              <option>Least Recently Updated</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderContainer;
