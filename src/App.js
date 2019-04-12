import React, { Component } from 'react';
import HeaderContainer from './components/HeaderContainer';
import IssuesContainer from './components/IssuesContainer';
import issues from './issues.json';
import './App.css';

const labelList = [];
issues.forEach(issue => {
  issue.labels.forEach(label => {
    if(!labelList.includes(label)) labelList.push(label);
  });
});

const authorList = [];
issues.forEach(issue => {
  if(!authorList.includes(issue.user.login)) authorList.push(issue.user.login);
});

class App extends Component {
  state = {
    open: issues.filter((item) => item.state === 'open').length,
    close: issues.filter((item) => item.state === 'close').length,
    data: issues
  }

  issueData = () => {
    this.setState({
      data: issues,
    })
  }

  // set status
  callbackStateHandler = (status) => {
    this.setState({
      data:issues.filter(issue => issue.state === status),
    })
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer issuesHandler = {this.issueData} stateHandler = {this.callbackStateHandler} openState = {this.state.open} closeState = {this.state.close}/>
        <div className = 'issues-data'>
          {this.state.data.map(item => 
            <IssuesContainer value = {item}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
