import React, { useMemo } from 'react';
import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  cuisines: string[];

  // Add any other properties you expect in the response
}
interface RecipeDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  sharedVariable: number;
  setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({setDisplay,sharedVariable}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const apikey = 'f7747b08130e41e0b9628561ab6afd31';

  const getRecipeInfo = useMemo(async () => {

    const id = sharedVariable;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apikey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }, [setSelectedRecipe]);

  const showSelectedRecipe = () => {
    getRecipeInfo.then();
    if (!selectedRecipe) {
      return null;
    }

    return (
      <div>
        <h2>{selectedRecipe.title}</h2>
        <img src={selectedRecipe.image} alt="Recipe" />
        <h5>{selectedRecipe.cuisines.reduce((acc, e, i) =>
          (i === selectedRecipe.cuisines.length - 1)? acc + e : acc + e + ", ", "")}</h5>
        <h5>{"Preperation Time: " + selectedRecipe.readyInMinutes + " min"}</h5>
        <h5>{"Serves " + selectedRecipe.servings + "."}</h5>
        <h6>{selectedRecipe.instructions}</h6>
      </div>
    );
  };

 return (
 <div>
  <button onClick= {() => setDisplay(true)}>{sharedVariable}</button>
  {showSelectedRecipe()}
 </div>);
}

export default RecipeDisplay;
