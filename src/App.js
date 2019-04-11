import React, { Component } from 'react';
import HeaderContainer from './components/HeaderContainer';
import IssuesContainer from './components/IssuesContainer';
import issues from './issues.json';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <div className = 'issues-data'>
          {issues.map(item => 
            <IssuesContainer value = {item}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
