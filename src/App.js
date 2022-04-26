import React from "react";
import "./App.css";
import Button from "./components/Button";
import Messages from "./components/Messages";
import Input from "./components/Input";

function getRandomName() {
  const colors = [
    "blue",
    "red",
    "green",
    "white",
    "purple",
    "black",
    "gray",
    "orange",
    "yellow",
    "pink",
    "silver",
    "gold",
    "white",
    "brown",
    "olive",
    "maroon",
    "violet",
    "charcoal",
    "magenta",
    "cream",
    "tan",
    "teal",
    "lavender",
    "mauve",
    "peach",
    "rust",
    "burgundy",
    "cyan",
  ];
  const fruits = [
    "apple",
    "apricots",
    "avocado",
    "banana",
    "blackberry",
    "blackcurrant",
    "blueberry",
    "carambola",
    "cherry",
    "clementine",
    "cranberry",
    "coconut",
    "grapefruit",
    "guava",
    "melon",
    "watermelon",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "olive",
    "peach",
    "pear",
    "pitaya",
    "pineapple",
    "plum",
    "pomegranate",
    "strawberry",
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];
  const fruit = fruits[Math.floor(Math.random() * fruits.length)];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return capitalizeFirstLetter(color) + capitalizeFirstLetter(fruit);
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: true,
      messages: [],
      currentUser: "",
      member: {
        username: "",
        color: randomColor(),
      },
    };
  }

  onChangeUserName = (e) => {
    const { color } = this.state.member;
    let username = e.target.value;
    this.setState({ member: { username, color } });
  };

  onClickSubmitUserName = (event) => {
    const { username } = this.state.member;
    event.preventDefault();
    this.drone = new window.Scaledrone("Pdjm5XaQT4Izyd0n", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });

    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
    if (username) {
      this.setState({ isDialogVisible: false });
    } else {
      alert("Username is empty");
    }
  };

  handleSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };

  handleRandomUserName = (event) => {
    event.preventDefault();
    this.setState({
      member: { username: getRandomName(), color: randomColor() },
    });
  };

  render() {
    const { isDialogVisible } = this.state;
    const { username } = this.state.member;
    return (
      <div className="App">
        {isDialogVisible ? (
          <form onSubmit={this.onClickSubmitUserName}>
            <div className="userNameInputWrapper">
              <div className="contentWrapper">
                <label>
                  Please enter your username, or choose random name:{" "}
                </label>
                <br />
                <input
                  id="userNameValue"
                  placeholder="Enter your user name"
                  type="text"
                  value={username}
                  onChange={this.onChangeUserName}
                />
                <br />
                <Button type="submit" onClick={this.handleRandomUserName}>
                  Get random name
                </Button>
                <br /> <br />
                <Button type="submit" onClick={this.onClickSubmitUserName}>
                  Submit
                </Button>{" "}
              </div>
            </div>
          </form>
        ) : null}
        <div className="chatWrapper">
          <div className="header">
            <h1>Chat App</h1>
          </div>
          <div>
            <Messages
              messages={this.state.messages}
              currentMember={this.state.member}
            />
          </div>
          <Input onSendMessage={this.handleSendMessage} />
        </div>
      </div>
    );
  }
}

export default App;
