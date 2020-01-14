import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

const ENDPOINT = "localhost:5000";
let socket = io(ENDPOINT);

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io.connect();

    setName(name);
    socket.emit("signin", { name }, ({ err }) => {
      console.log(err);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
    
  }, [ENDPOINT, location.search]);
  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer"></div>
    </div>
  );
};

export default Chat;
