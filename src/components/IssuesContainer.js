import React, { Component } from "react";
import moment from 'moment';
import LabelContainer from "./LabelContainer";
import "../App.css";

export class IssuesContainer extends Component {
  render() {
    let number = `#${this.props.value.number}`;
    return (
      <div className="issues-container">
        <div className="issues-title">
          <i style={{ fontSize: "24px" }} className="fa">&#xf06a;&nbsp;&nbsp;</i>
          <p>{this.props.value.title}&nbsp;&nbsp;</p>
            {this.props.value.labels.map(item => (
              <LabelContainer color={item.color} name={item.name} />
            ))}
        </div>
          <div className = 'numberFooter'>
            <p style = {{fontSize: '13.5px'}}>{number} {moment(this.props.value.created_at).fromNow()} by {this.props.value.user.login}</p>
          </div>
      </div>
    );
  }
}

export default IssuesContainer;
