import React, {Link} from 'react';
import { withRouter } from 'react-router-dom';
import useLoginInLanding from "../../useLoginInLanding";
import validate from '../../LoginValidation';
import "./LandingPage.css"
import { useHistory } from "react-router-dom";


const LandingPage = () => {
  const history = useHistory();
  function login() {
    history.push(`/chat?name=${values.name}`)
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useLoginInLanding(login, validate);
 

  return (
    <div className="outerContainer">
        
          <div className="innerContainer">
            <form onSubmit={handleSubmit} noValidate>
                <label className="heading">Join Chat</label>
                
                  <input autoComplete="off" className="LandingPageJoin" type="name" name="name" onChange={handleChange} value={values.name || ''} required />
                  {errors.name && (
                    <p className="error">{errors.name}</p>
                  )}
                
              
              <button 
        className="signInBtn btn" type="submit"><svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg><span>ENTER CHAT</span></button>
            </form>
          </div>
        
    </div>
  );
};

export default withRouter(LandingPage);