import React, { Component } from "react";
import { connect  } from 'react-redux';
import { getData, getComments, commentToAdd, deleteComment } from './../actions/CommentActions';
import "./BodyContainer.css";
import ReactMarkdown from "react-markdown";

const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}
let repoOwner = repoData.owner+'/'+repoData.repo;
// let newToken = sessionStorage.getItem("data");
export class BodyContainer extends Component {
  addComment = e => {
    this.props.commentToAdd(e, this.props.data.number, this.props.comments);
  };
  state=[];

  deleteComment = e => {
    this.props.deleteComment(e, this.props.comments)
    // if (newToken !== null) {
    //   fetch(
    //     `https://api.github.com/repos/${repoOwner}/issues/comments/${
    //       e.target.id
    //     }?access_token=${newToken}`,
    //     { method: "DELETE" }
    //   ).catch(err => console.log(err));
    //   let update = this.state.comments.filter(
    //     ele => parseInt(ele.id) !== parseInt(e.target.id)
    //   );
    //   this.setState({ comments: update });
    // }
  };

  componentDidMount() {
    this.props.getData(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  componentDidUpdate(props){
    console.log("updated")
  }
  getDerivedStateFromProps(props){
    console.log("derieve")
  }
  
  render() {
    console.log(this.props,"bodydd")
    let homeUrl = "http://localhost:3000";
    if (this.props.data === null) {
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
              <a href={`https://github.com/${repoOwner}`}>
                {repoData.owner}/<strong>{repoData.repo}</strong>
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
              <h2>{this.props.data.title}</h2>
            </div>
            <div className="dp-title">
              <div className="dp-img">
                <img src={this.props.data.user.avatar_url} alt="" />
              </div>
              <div className="issue-body-comments">
                <div>
                  <ReactMarkdown skipHtml={true}>
                    {this.props.data.body}
                  </ReactMarkdown>
                </div>
                <div>
                  <h3>Comments:</h3>
                </div>
                {this.props.comments.map(comment => (
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
                <div className = 'comment-username'>
                <div>
                  <h5>thousif7:</h5>
                </div>
                <div className="add-comments">
                  <input
                    onKeyPress={this.addComment}
                    type="text"
                    placeholder=" Add Comments"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state," inside maps")
  return ({
    data: state.comments.data,
    comments: state.comments.comments
  })
}

export default connect(mapStateToProps,{getData, getComments, commentToAdd, deleteComment})(BodyContainer);
