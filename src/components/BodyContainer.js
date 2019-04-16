import React, { Component } from "react";
import "./BodyContainer.css";
import ReactMarkdown from "react-markdown";
export class BodyContainer extends Component {
  state = {
    data: null
  };

  getData(id) {
    fetch(`https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/${id}`)
      .then(res => res.json())
      .then(bodyData => {
        this.setState({
          data: bodyData
        });
      });
  }

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  render() {
    if (this.state.data === null) {
      return (
        <div className = 'loading'>
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
          <div className="body-data">
            <div className="body-title">
              <h2>{this.state.data.title}</h2>
            </div>
            <div className="dp-title">
              <div className="dp-img">
                <img src={this.state.data.user.avatar_url} alt="" />
              </div>
              <div>
                <ReactMarkdown>{this.state.data.body}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BodyContainer;
