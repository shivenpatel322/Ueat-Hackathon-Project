import React from "react";
import "./Ingredients.css"
import { LoginProps } from "./types";
import RecipeFinder from "./RecipeFinder";

const Ingredients: React.FC<LoginProps> = ({ setLoggedIn }) => {
    
 return(
    <div className="container">
         <div className = "ingredients">
                <h1>Ingredients</h1>
                <RecipeFinder />
            </div>
        <button onClick={() => setLoggedIn(false)} > Back to Welcome</button>
    </div>
 );
};

export default Ingredients;
