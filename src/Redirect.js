import React, { Component } from "react";
class Redirect extends Component {
  componentDidMount() {
    this.props.children[1].history.push("/page/"+1);
  }

  render() {
      return (
        <div>

        </div>
      );
    }
  }

export default Redirect;
