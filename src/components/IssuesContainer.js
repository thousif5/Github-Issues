import React, { Component } from "react";
import moment from "moment";
import LabelContainer from "./LabelContainer";
import './IssuesContainer.css';
import "../App.css";

export class IssuesContainer extends Component {
  render() {
    let number = `#${this.props.value.number}`;
    let pos = this.props.value.state;

    const commentCount = () => {
      if(this.props.value.comments > 0) {
        return (
          <div className="comments">
            <a href = {this.props.value.comments_url}><i style = {{fontSize: '24px'}} className="far fa-comment-alt">&nbsp;{this.props.value.comments}</i></a>
          </div>
        )
      }
    }

    pos === "open" ? (pos = "opened") : (pos = "closed");
    return (
      <div className="issues-container">
        <div className = 'title-comment'>
        <div className="issues-title">
          <i style={{ fontSize: "24px" }} className="fa">
            &#xf06a;&nbsp;&nbsp;
          </i>
          <p>
            <a href="#">{this.props.value.title}</a>&nbsp;&nbsp;
          </p>
          {this.props.value.labels.map(item => (
            <LabelContainer color={item.color} name={item.name} />
          ))}
        </div>
          {commentCount()}
        </div>
        <div className="numberFooter">
          <p style={{ fontSize: "13.5px" }}>
            {number} {pos} {moment(this.props.value.created_at).fromNow()} by{" "}
            <a href={this.props.value.user.html_url}>
              {this.props.value.user.login}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default IssuesContainer;
