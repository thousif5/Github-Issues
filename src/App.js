import React, { Component } from "react";
import HeaderContainer from "./components/HeaderContainer";
import IssuesContainer from "./components/IssuesContainer";
import { connect } from "react-redux";
import {
  getData,
  doSort,
  setStatus,
  getAuthorsFiltered,
  searchData
} from "./actions/IssueActions";
import Pagination from "./components/Pagination";
import moment from "moment";
import "./App.css";

const repoData = {
  owner: "thousif7",
  repo: "test-issues"
};
let repoOwner = repoData.owner + "/" + repoData.repo;
let authorList = [];
class App extends Component {
  issueData = () => {
    this.props.getData(this.props.page);
  };

  // set status
  openStateHandler = (status) => {
    this.props.setStatus(status, this.props.page);
  };

  authorDropDown = (e) => {
    this.props.getAuthorsFiltered(e, this.props.page);
  };

  sortHandler = e => {
    let sortedData = [];
    const newData = [...this.props.data];
    if (e.target.value === "Oldest") {
      sortedData = newData.sort((a, b) => {
        return moment(a.created_at) - moment(b.created_at);
      });
    } else if (e.target.value === "Newest") {
      sortedData = newData.sort((a, b) => {
        return moment(b.created_at) - moment(a.created_at);
      });
    } else if (e.target.value === "Recently Upadated") {
      sortedData = newData.sort((a, b) => {
        return moment(b.updated_at) - moment(a.updated_at);
      });
    } else if (e.target.value === "Least Recently Updated") {
      sortedData = newData.sort((a, b) => {
        return moment(a.updated_at) - moment(b.updated_at);
      });
    }

    this.props.doSort(sortedData);
  };

  searchHandler = e => {
    if (e.key === "Enter") {
      this.props.searchData(e.target.value, this.props.data);
    }
  };

  componentDidMount() {
    this.props.getData(1);
  }

  handlePage = e => {
    let page = e.selected + 1;
    this.props.children[1].history.push("/page/" + page);
    this.props.getData(page);
  };

  render() {
    if (this.props.data === null) {
      return (
        // loading animation css
        <div className="loading">
          <h1>Be patient, We're working on it</h1>
          <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1" />
            <div class="sk-cube sk-cube2" />
            <div class="sk-cube sk-cube3" />
            <div class="sk-cube sk-cube4" />
            <div class="sk-cube sk-cube5" />
            <div class="sk-cube sk-cube6" />
            <div class="sk-cube sk-cube7" />
            <div class="sk-cube sk-cube8" />
            <div class="sk-cube sk-cube9" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <HeaderContainer
            repoData={repoData}
            repoOwner={repoOwner}
            issuesHandler={this.issueData}
            openStateHandler={this.openStateHandler}
            openState={this.props.open}
            closeState={this.props.close}
            authors={authorList}
            authorsHandler={this.authorDropDown}
            dataToSort={this.sortHandler}
            searchData={this.searchHandler}
          />
          <div className="issues-data">
            {this.props.data.map(item => (
              <IssuesContainer value={item} />
            ))}
          </div>
          <Pagination
            handlePage={this.handlePage}
            page={parseInt(this.props.children[1].match.params.pageNo) - 1}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.issues.data,
    page: state.issues.page,
    open: state.issues.open,
    close: state.issues.close,
    authorList: state.issues.authorList.forEach(issue => {
      if (!authorList.includes(issue.user.login)) {
        authorList.push(issue.user.login);
      }
    }),
    issuesData: state.issues.data
  };
};

export default connect(
  mapStateToProps,
  { getData, doSort, setStatus, getAuthorsFiltered, searchData }
)(App);
