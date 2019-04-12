import React, { Component } from "react";
import tinycolor from 'tinycolor2';
import "../App.css";

export class LabelContainer extends Component {
  render() {
    let buttonColor = `#${this.props.color}`;
    var colorz = tinycolor(buttonColor);
    let textColor = "";
    colorz.isLight() ? textColor = 'black' : textColor = 'white';
    return (
      <div className = 'label-div'>
        <div className="labels" style={{ backgroundColor: buttonColor }}>
          <label style = {{fontSize: '13.5px', color: textColor}}><strong>{this.props.name}</strong></label>
        </div>
      </div>
    );
  }
}

export default LabelContainer;
