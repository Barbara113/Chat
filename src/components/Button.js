import { Component } from "react";
import React from "react";
import "./css/button.css";

class Button extends Component {
  render() {
    return (
      <div>
        <button className="buttonClass" onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default Button;
