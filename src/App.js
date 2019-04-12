import React, { Component } from "react";
import HeaderContainer from "./components/HeaderContainer";
import IssuesContainer from "./components/IssuesContainer";
import issues from "./issues.json";
import moment from 'moment';
import "./App.css";

let labelList = [];
issues.forEach(issue => {
  issue.labels.forEach(label => {
    if (!labelList.includes(label.name)) labelList.push(label.name);
  });
});

let authorList = [];
issues.forEach(issue => {
  if (!authorList.includes(issue.user.login)) authorList.push(issue.user.login);
});

class App extends Component {
  state = {
    open: issues.filter(item => item.state === "open").length,
    close: issues.filter(item => item.state === "close").length,
    data: issues
  };

  issueData = () => {
    this.setState({
      data: issues
    });
  };

  // set status
  callbackStateHandler = status => {
    this.setState({
      data: issues.filter(issue => issue.state === status)
    });
  };

  labelDropDown = e => {
    let tempArray = issues.filter(issue => {
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
      data:issues.filter(issue => issue.user.login === e.target.value),
    })
  }

  sortHandler = e => {
    let sortedData = [];
    if(e.target.value === 'Oldest') {
      sortedData = issues.sort((a, b) => {
        return moment(a.created_at) - moment(b.created_at);
      })
    }
    else if(e.target.value === 'Newest') {
      sortedData = issues.sort((a, b) => {
        return moment(b.created_at) - moment(a.created_at);
      })
    }

    else if(e.target.value === 'Recently Upadted') {
      sortedData = issues.sort((a, b) => {
        return moment(b.updated_at) - moment(a.updated_at);
      })
    }

    else if(e.target.value === 'Least Recently Updated') {
      sortedData = issues.sort((a, b) => {
        return moment(a.updated_at) - moment(b.updated_at);
      })
    }

    this.setState({
      data:sortedData
    })
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
          authorsHandler = {this.authorDropDown}
          dataToSort = {this.sortHandler}
        />
        <div className="issues-data">
          {this.state.data.map(item => (
            <IssuesContainer value={item} />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
