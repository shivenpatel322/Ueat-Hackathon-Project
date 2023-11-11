import React from "react";
import "./Ingredients.css"
import { LoginProps } from "./types";

const Ingredients: React.FC<LoginProps> = ({ setLoggedIn }) => {
 return(
    <div className="container">
        <button onClick={() => setLoggedIn(false)} ></button>
    </div>
 );
};

export default Ingredients;
