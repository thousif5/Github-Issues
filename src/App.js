import React, { Component } from "react";
import HeaderContainer from "./components/HeaderContainer";
import IssuesContainer from "./components/IssuesContainer";
import Pagination from "./components/Pagination";
// import issues from "./issues.json";
import moment from "moment";
import "./App.css";

let labelList = [];
let authorList = [];
class App extends Component {
  state = {
    open: "",
    close: "",
    data: [],
    labelList: [],
    authorList: [],
    issuesData: []
  };

  issueData = () => {
    this.setState({
      data: this.state.issuesData
    });
  };

  // set status
  callbackStateHandler = status => {
    this.setState({
      data: this.state.data.filter(issue => issue.state === status)
    });
  };

  labelDropDown = e => {
    let tempArray = this.state.data.filter(issue => {
      let temp = false;
      issue.labels.forEach(label => {
        if (label.name === e.target.value) {
          temp = true;
        }
      });
      return temp;
    });
    this.setState({
      data: tempArray
    });
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

  setData = (value) => {
    fetch(`https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?page=${value}`)
      .then(res => res.json())
      .then(issues =>
        this.setState({
          data: issues,
          open: issues.filter(item => item.state === "open").length,
          close: issues.filter(item => item.state === "close").length,
          labelList: issues.forEach(issue => {
            issue.labels.forEach(label => {
              if (!labelList.includes(label.name)) labelList.push(label.name);
            });
          }),

          authorList: issues.forEach(issue => {
            if (!authorList.includes(issue.user.login))
              authorList.push(issue.user.login);
          }),
          issuesData: issues
        })
      );
  }

  componentDidMount() {
    this.setData(1);
  }

  handlePage = e => {
    this.setData(e.selected+1);
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer
          issuesHandler={this.issueData}
          stateHandler={this.callbackStateHandler}
          openState={this.state.open}
          closeState={this.state.close}
          labels={labelList}
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
        <Pagination handlePage = {this.handlePage} />
      </div>
    );
  }
}
export default App;
