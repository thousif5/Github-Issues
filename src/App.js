import React, { Component } from "react";
import HeaderContainer from "./components/HeaderContainer";
import IssuesContainer from "./components/IssuesContainer";
import Pagination from "./components/Pagination";
import moment from "moment";
import "./App.css";

const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}
let repoOwner = repoData.owner+'/'+repoData.repo;
let authorList = [];
class App extends Component {
  state = {
    open: "",
    close: "",
    data: null,
    authorList: [],
    issuesData: [],
    page: 0
  };

  issueData = () => {
    this.setState({
      data: this.state.issuesData
    });
  };

  // set status
  openStateHandler = status => {
    this.setState({
      data: this.state.issuesData.filter(issue => issue.state === status)
    });
  };

  closeStateHandler = status => {
    this.setState({
      data: this.state.data.filter(issue => issue.state === status)
    });
  };

  labelDropDown = e => {
    fetch(`https://api.github.com/repos/${repoOwner}/issues?labels=${e}`)
    .then(res => res.json())
    .then(labelFiltered => 
    this.setState({
      data: labelFiltered
    })
    )
  };

  authorDropDown = e => {
    this.setState({
      data: this.state.data.filter(issue => issue.user.login === e.target.value)
    });
  };

  sortHandler = e => {
    let sortedData = [];
    if (e.target.value === "Oldest") {
      sortedData = this.state.data.sort((a, b) => {
        return moment(a.created_at) - moment(b.created_at);
      });
    } else if (e.target.value === "Newest") {
      sortedData = this.state.data.sort((a, b) => {
        return moment(b.created_at) - moment(a.created_at);
      });
    } else if (e.target.value === "Recently Upadted") {
      sortedData = this.state.data.sort((a, b) => {
        return moment(b.updated_at) - moment(a.updated_at);
      });
    } else if (e.target.value === "Least Recently Updated") {
      sortedData = this.state.data.sort((a, b) => {
        return moment(a.updated_at) - moment(b.updated_at);
      });
    }

    this.setState({
      data: sortedData
    });
  };

  searchHandler = e => {
    if (e.key === "Enter") {
      this.setState({
        data: this.state.data.filter(
          issue => issue.title.toLowerCase().indexOf(e.target.value) !== -1
        )
      });
    }
  };

  setData = value => {
    fetch(
      `https://api.github.com/repos/${repoOwner}/issues?per_page=4`
    )
      .then(res => res.json())
      .then(issues =>
        this.setState({
          data: issues,
          open: issues.filter(item => item.state === "open").length,
          close: issues.filter(item => item.state === "close").length,
          authorList: issues.forEach(issue => {
            if (!authorList.includes(issue.user.login))
              authorList.push(issue.user.login);
          }),
          issuesData: issues
        
        })
      );
  };

  componentDidMount() {
    this.setData(1);
  }

  handlePage = e => {
    let page = e.selected +1;
    this.props.children[1].history.push("/page/" + page);
  };

  render() {
    if (this.state.data === null) {
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
            repoData = {repoData}
            repoOwner = {repoOwner}
            issuesHandler={this.issueData}
            closeStateHandler={this.closeStateHandler}
            openStateHandler={this.openStateHandler}
            openState={this.state.open}
            closeState={this.state.close}
            labelsHandler={this.labelDropDown}
            authors={authorList}
            authorsHandler={this.authorDropDown}
            dataToSort={this.sortHandler}
            searchData={this.searchHandler}
          />
          <div className="issues-data">
            {this.state.data.map(item => (
              <IssuesContainer value={item} />
            ))}
          </div>
          <Pagination handlePage={this.handlePage} page = {this.state.page} />
        </div>
      );
    }
  }
}
export default App;
