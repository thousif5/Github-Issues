import React, { Component } from "react";
// import { newToken } from "./auth";
import "./BodyContainer.css";
import ReactMarkdown from "react-markdown";

// const token = '15e06e7d9a0b88ea3615c5e37caf4b494d22a261';
let newToken = localStorage.getItem("data");
export class BodyContainer extends Component {
  state = {
    data: null,
    comments: [],
  };

  getData(id) {
    if (newToken !== null) {
      fetch(
        `https://api.github.com/repos/thousif7/test-issues/issues/${id}`
      )
        .then(res => res.json())
        .then(bodyData => {
          this.setState({
            data: bodyData
          });
        });
    }
  }

  getComments(id) {
    if (newToken !== null) {
      fetch(
        `https://api.github.com/repos/thousif7/test-issues/issues/${id}/comments`
      )
        .then(res => res.json())
        .then(commentData => {
          this.setState({
            comments: commentData
          });
        });
    }
  }

  addComment = e => {
    if (newToken !== null && e.key === "Enter") {
        fetch(
          `https://api.github.com/repos/thousif7/test-issues/issues/${
            this.state.data.number
          }/comments?access_token=${newToken}`,
          { method: "POST", body: JSON.stringify({ body: e.target.value }) }
        )
          .then(commentData => commentData.json())
          .then(addedComments => {
            let tempArray = this.state.comments;
            tempArray.push(addedComments);
            this.setState({
              comments: tempArray
            });
          });
        e.target.value = "";
    }
  };

  deleteComment = e => {
    if (newToken !== null) {
      fetch(
        `https://api.github.com/repos/thousif7/test-issues/issues/comments/${
          e.target.id
        }?access_token=${newToken}`,
        { method: "DELETE" }
      ).catch(err => console.log(err));
      let update = this.state.comments.filter(
        ele => parseInt(ele.id) !== parseInt(e.target.id)
      );
      this.setState({ comments: update });
    }
  };

  componentDidMount() {
    this.getData(this.props.match.params.id);
    this.getComments(this.props.match.params.id);
  }

  render() {
    let homeUrl = "http://localhost:3000";
    if (this.state.data === null) {
      return (
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
        <div>
          <div className="header-body">
            <div className="title">
              <a href="https://github.com/thousif7/test-issues">
                freeCodeCamp/<strong>freeCodeCamp</strong>
              </a>
            </div>
            <div className="issues-border">
              <div className="issues-tab">
                <i style={{ fontSize: "24px" }} className="fa">
                  &#xf06a;&nbsp;
                </i>
                <p>
                  <a href={homeUrl}>issues</a>
                </p>
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
              <div className="issue-body-comments">
                <div>
                  <ReactMarkdown skipHtml={true}>
                    {this.state.data.body}
                  </ReactMarkdown>
                </div>
                <div>
                  <h3>Comments:</h3>
                </div>
                {this.state.comments.map(comment => (
                  <div className="comments-to-populate">
                    <div className="avatar-user">
                      <img src={comment.user.avatar_url} alt="" />
                      <h5>
                        <a href={comment.user.html_url}>
                          {comment.user.login}:
                        </a>
                      </h5>
                    </div>
                    <div className="comment-user">
                      <p>{comment.body}</p>
                      <button
                        id={comment.id}
                        onClick={this.deleteComment}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="add-comments">
                  <input
                    onKeyPress={this.addComment}
                    type="text"
                    placeholder="Add Comments"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BodyContainer;
