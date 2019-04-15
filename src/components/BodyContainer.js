import React, { Component } from "react";
import "./BodyContainer.css";

export class BodyContainer extends Component {
  state = {
    data: null
  };

  getData(id) {
    fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/${id}`
    ).then(res => res.json())
    .then(bodyData => {
      this.setState({
        data: bodyData
      })
    })
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  render() {
    if(this.state.data === null){
      return(
        <h1>Be patient, We're working on it</h1>
      )
    }
    else {
      console.log(this.state.data)
    return (
      <div>
        <div className="header-body">
          <div className="title">
            <a href="https://github.com/freeCodeCamp/freeCodeCamp">
              freeCodeCamp/<strong>freeCodeCamp</strong>
            </a>
          </div>
          <div className="issues-border">
            <div onClick={this.allIssues} className="issues-tab">
              <i style={{ fontSize: "24px" }} className="fa">
                &#xf06a;&nbsp;
              </i>
              <p>issues</p>
            </div>
          </div>
        </div>
        <div className = 'body-data'>
          <div className = 'body-title'>
            <h2>{this.state.data.title}</h2>
          </div>
          <div className = 'dp-title'>
          <div className = 'dp-img'>
            <img src = {this.state.data.user.avatar_url} alt = ''></img>
          </div>
          <div>
            <p>{this.state.data.body}</p>
          </div>
          </div>
          
        </div>
      </div>
    );
    }
  }
}

export default BodyContainer;
