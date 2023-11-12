import React, { useState } from 'react';
import RecipeFinder from './RecipeFinder'; // Import your RecipeFinder component
import RecipeDisplay from './RecipeDisplay'; // Import your RecipeDisplay component
import { LoginProps } from './types';

const Ingredients: React.FC<LoginProps> = ({ setLoggedIn }) => {
  // Shared variable
  const [sharedVariable, setSharedVariable] = useState(0);

  // State to manage whether to display RecipeFinder or RecipeDisplay
  const [displaying, setDisplay] = useState(true);

  return (
    <div className="container">
      <h1>Ueat Recipes</h1>
      <div className="ingredients">
        {displaying ?
        (
          <RecipeFinder
            setDisplay={setDisplay}
            sharedVariable={sharedVariable}
            setSharedVariable={setSharedVariable}
          />
        ) : (
          <RecipeDisplay
            setDisplay={setDisplay}
            sharedVariable={sharedVariable}
            setSharedVariable={setSharedVariable}
          />
        )}
      </div>
      <button onClick={() => setLoggedIn(false)}>Back to Welcome</button>
    </div>
  );
};

export default Ingredients;