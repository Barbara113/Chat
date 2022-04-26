import { Component } from "react";
import React from "react";
import Button from "./Button";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  onSubmit = (e) => {
    const { value } = this.state;
    e.preventDefault();
    this.setState({ value: "" });
    if (!value || value.trim() === "") {
      alert("Please enter your message");
    } else {
      this.props.onSendMessage(value);
    }
  };

  onChange(e) {
    let value = e.target.value;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="inputComponent">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            className="inputValue"
            onChange={(e) => this.onChange(e)}
            value={value}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus
          />
          <Button onClick={this.onSubmit}>Send</Button>
        </form>
      </div>
    );
  }
}

export default Input;
