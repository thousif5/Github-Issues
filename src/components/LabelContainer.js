import React, { Component } from "react";
import "../App.css";

export class LabelContainer extends Component {
  render() {
    let buttonColor = `#${this.props.color}`;
    return (
      <div className = 'label-div'>
        <div className="labels" style={{ backgroundColor: buttonColor }}>
          <label style = {{fontSize: '13.5px'}}><strong>{this.props.name}</strong></label>
        </div>
      </div>
    );
  }
}

export default LabelContainer;
