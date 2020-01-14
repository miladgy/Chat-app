import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

const ENDPOINT = "localhost:5000";
let socket = io(ENDPOINT);

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io.connect();

    setName(name);
    socket.emit("signin", { name }, (error) => {
      console.log(error);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
    
  }, [ENDPOINT, location.search]);

useEffect(() => {
  socket.on('message', (message) => {
    console.log('do i come in here')
    setMessages([...messages, message]);
  })
}, [messages])

const sendMessage = (e) => {
  e.preventDefault();
  if (message){
    socket.emit('sendMessage', message, () => setMessage(''))
  }
}
console.log('message', message)
console.log('messagez', messages)
  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer">
        <input 
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  );
};

export default Chat;
