
import React, { } from "react";
import {LoginProps } from "./types";
import Ueat_logo from "./Ueat_logo.png";
const Welcome: React.FC<LoginProps> = ({ setLoggedIn }) => {
    return(
        <>
        <div>
      </div>
      <h1>Welcome</h1>
      <img src = {Ueat_logo} className = 'logo' onClick={() => setLoggedIn(true)}></img>
      <div className="card">
      </div>
      </>
     );
};
export default Welcome;