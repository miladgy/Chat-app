import React from "react";
import "./Input.css";

// const activityHandler = (e) => {
//   console.log('inside handler func')
//   let typingTimer = null; //timer identifier
//   clearTimeout(typingTimer);
//   typingTimer = setTimeout(() => {
//    if (e.target.value) {
//      console.log('Stopped typing !');
//    }
//   }, 2000);

//   //user is "finished typing," do something
//   // function doneTyping() {
//   //   socket.emit('disconnect');
//   //   socket.off();
//   // }
// };



const Input = ({message, setMessage, sendMessage}) => {
  
  const onInput = (e) => {
    console.log(e.target.value)
    let duration = 2000;
    let inputTimer = setTimeout(()=>{
      if (e.target.value === message) {
        console.log('you stopped typing')
      };
    }, duration);
    clearTimeout(inputTimer);
  }
  
    return (

  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={e => setMessage(e.target.value)}
      // onChange={e => onInput(e)}
      onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
    />
    <button class="sendBtn Btn" onClick={e => sendMessage(e)}>Send</button>
  </form>
    )
    };

export default Input;
