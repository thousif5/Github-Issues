import React, { Component } from "react";
import HeaderContainer from "./components/HeaderContainer";
import IssuesContainer from "./components/IssuesContainer";
import { connect } from "react-redux";
import { getData, getFilter } from "./actions/IssueActions";
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
  filterAll = (obj) => {
    this.props.getFilter(obj);
  }

  allFilter = (data, filter) => {
    if(filter.authors !== '') data = data.filter(item => item.user.login === filter.authors);
    if(filter.sort !== '') data = this.sortHandler(data, filter.sort);
    if(filter.search !== '') data = this.searchHandler(data, filter.search);
    return data;
  }

  issueData = () => {
    this.props.getData(this.props.page);
  };

  sortHandler = (data, option) => {
    if (option === "Oldest") {
      data = data.sort((a, b) => {
        return moment(a.created_at) - moment(b.created_at);
      });
    } else if (option === "Newest") {
      data = data.sort((a, b) => {
        return moment(b.created_at) - moment(a.created_at);
      });
    } else if (option === "Recently Upadated") {
      data = data.sort((a, b) => {
        return moment(b.updated_at) - moment(a.updated_at);
      });
    } else if (option === "Least Recently Updated") {
      data = data.sort((a, b) => {
        return moment(a.updated_at) - moment(b.updated_at);
      });
    }

    return data;
  };

  searchHandler = (data, value) => {
      data = data.filter(
        issue => issue.title.toLowerCase().indexOf(value) !== -1
      )
      return data;
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

    let newData = this.props.data.data;
    let filter = this.props.data.filter;


    newData = this.allFilter(newData,filter);
    let openData = newData.filter(val => val.state === 'open').length
    let closeData = newData.filter(val => val.state === 'closed').length
     if(filter.state !== '') newData = newData.filter(val => val.state === filter.state)
    if (newData === null) {
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
            filterAll = {this.filterAll}
            repoData={repoData}
            repoOwner={repoOwner}
            issuesHandler={this.issueData}
            openState={openData}
            closeState={closeData}
            authors={authorList}
            authorsHandler={this.authorDropDown}
          />
          <div className="issues-data">
            {newData.map(item => (
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
    data: state.issues,
    page: state.issues.page,
    authorList: state.issues.authorList.forEach(issue => {
      if (!authorList.includes(issue.user.login)) {
        authorList.push(issue.user.login);
      }
    }),
  };
};

export default connect(
  mapStateToProps,
  { getData, getFilter }
)(App);
