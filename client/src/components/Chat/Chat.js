import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import NavBar from "../NavBar/NavBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';


const ENDPOINT = "localhost:5000";
let socket = io(ENDPOINT)
// let socket = io(ENDPOINT, {
//   forceNew: true,
//   reconnection: true,
//   reconnectionDelay: 3000,
//   reconnectionDelayMax: 5000,
//   reconnectionAttempts: 0
// });

const Chat = ({ location }) => {
  const history = useHistory();
  const [name, setName] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const { name } = queryString.parse(location.search);

    setName(name);
    socket.emit("signin", { name }, error => {
      if(error) {
          alert(error)
          history.push(`/`)
      }
    });
   
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  
  }, [messages]);

  useEffect(() => {

    socket.on("disconnect", () => {
      
         setTimeout(() => {
          history.push(`/`)
         }, 2000); 
    });
   
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [history]);

  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log("message", message);
  console.log("messagez", messages);
  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer">
        <NavBar />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default withRouter(Chat);
