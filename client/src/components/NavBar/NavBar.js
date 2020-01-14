import React from 'react'
import "./NavBar.css"
import online from "../../icons/online.png"
import exit from "../../icons/exit.png"

const NavBar = () => (
        <div className="navBar">
            <div className="navBarLeftCorner">
                <img className="onlineIcon" src={online} alt="online icon"/>
            </div>
            <div className="navBarRightCorner">
                <a href="/"><img className="exitIcon" src={exit} alt="exit icon"/></a>
            </div>
            
        </div>
    )


export default NavBar;
