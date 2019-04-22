import React, { Component } from "react";
import { auth, signOut } from "./auth";
import MultipleSelect from "./MultipleSelect";
import "../App.css";

export class HeaderContainer extends Component {
  constructor(props){
    super(props)
      this.state = {
      labels: [],
      signed: sessionStorage.getItem('signed')
    };
}

  getLabels = () => {
    fetch(`https://api.github.com/repos/${this.props.repoOwner}/labels`)
      .then(res => res.json())
      .then(labelsData =>
        this.setState({
          labels: labelsData
        })
      );
  };

  importToken = () => {
    if (sessionStorage.length === 1) {
      auth();
      // sessionStorage.setItem('status', true);
      this.setState({
        signed: 'sign out'
      })
    }
    else {
      signOut();
      // sessionStorage.removeItem('status')
      this.setState({
        signed: 'sign in'
      })
    }
  };

  allIssues = () => {
    this.props.issuesHandler();
  };

  reset = () => {
    var authorDropDown = document.getElementById("authorDropDown");
    authorDropDown.selectedIndex = 0;
    var sortDropDown = document.getElementById("sortDropDown");
    sortDropDown.selectedIndex = 0;
    this.allIssues();
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

  componentDidMount() {
    this.getLabels();
  }

  render() {
    let homeUrl = "http://localhost:3000";
    return (
      <div>
        <div className="title">
          <a href={`https://github.com/${this.props.repoOwner}`}>
            {this.props.repoData.owner}/
            <strong>{this.props.repoData.repo}</strong>
          </a>
          <input id="reset-button" onClick={this.reset} type="reset" />
          <input
            onKeyUp={this.searchInput}
            type="text"
            placeholder="Search.."
          />
          <button onClick={this.importToken} className="signIn">
            {this.state.signed}
            {/* {sessionStorage.getItem('data')  ? 'sign out' : 'sign in'} */}
          </button>
        </div>
        <div className="issues-border">
          <div className="issues-tab">
            <i style={{ fontSize: "24px" }} className="fa">
              &#xf06a;&nbsp;
            </i>
            <a href={homeUrl}>
              <p>issues</p>
            </a>
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
          <div className="author-drop">
            <select
              id="authorDropDown"
              onChange={this.authorDown}
              defaultValue="Authors"
            >
              <option value="Authors" disabled>
                &nbsp;&nbsp;Authors
              </option>
              {this.props.authors.map(author => (
                <option>{author}</option>
              ))}
            </select>
          </div>
          <div className="sortDrop">
            <select
              id="sortDropDown"
              onChange={this.sortData}
              defaultValue="Sort"
            >
              <option value="Sort" disabled>
                &nbsp;&nbsp;Sort
              </option>
              <option>Oldest</option>
              <option>Newest</option>
              <option>Recently Upadted</option>
              <option>Least Recently Updated</option>
            </select>
          </div>
          <div className="dropDown-list">
            <MultipleSelect labelsUi={this.state.labels} labelsDrop = {this.dropDown} />
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderContainer;
