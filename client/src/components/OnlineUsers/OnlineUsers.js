import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './OnlineUsers.css';

const OnlineUsers = ({onlineClients}) => (
  <div className="textContainer">
    {/* <div>
      <p>Realtime Chat Application<span role="img" aria-label="emoji">💬</span></p>
    </div> */}
    {
      onlineClients.onlineClients
        ? (
          <div>
            <p>People currently chatting:</p>
            <div className="activeContainer">
            {onlineClients.onlineClients.map((name) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                    <p className="onlineClient">{name}</p>
                  </div>
                ))}
            </div>
          </div>
        )
        : console.log('onlineClient is undefined')
    }
  </div>
);

export default OnlineUsers;