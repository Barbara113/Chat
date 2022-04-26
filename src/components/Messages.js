import React from "react";
import { useRef, useEffect } from "react";

function Messages(props) {
  let keyIndex = 0;
  const showMessages = (mess) => {
    const { member, text } = mess;
    const { currentMember } = props;

    const messageFromMe = member.id === currentMember.id;

    keyIndex += 1;

    return (
      <li
        className={
          messageFromMe ? "displayMessages currentMember" : "displayMessages"
        }
        key={keyIndex}
      >
        <span
          className="icon"
          style={{
            backgroundColor: member.clientData ? member.clientData.color : null,
          }}
        />
        {props.messages && (
          <div className={props.messages ? "messageValue" : "none"}>
            <div className="username">
              {member.clientData ? member.clientData.username : null}
            </div>
            <div className="text">{text}</div>
            {messageFromMe && <div className="arrow"></div>}
          </div>
        )}
      </li>
    );
  };

  const { messages } = props;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [props]);

  return (
    <ul className="messagesListWrapper" key={props.currentMember.id}>
      {messages.map((m) => showMessages(m))}
      <div ref={messagesEndRef} />
    </ul>
  );
}

export default Messages;
