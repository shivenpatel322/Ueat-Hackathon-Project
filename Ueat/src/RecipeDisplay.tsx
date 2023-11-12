import React, { useMemo } from 'react';
import { useState } from 'react';
import Ingredients from './Ingredients';

interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  instructions: string;
  cuisines: string[];
  extendedIngredients: Ingredients[]
  // Add any other properties you expect in the response
}

interface Ingredients {
  name: string;
  measures: {
    us: {amount: number; unitShort: string;}
    metric: {amount: number; unitShort: string;}
  };
}

interface RecipeDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  sharedVariable: number;
  setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({setDisplay,sharedVariable}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const apikey = '5594f49e044544d3afdccc085c6c1949';

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
        <h4>{selectedRecipe.cuisines.reduce((acc, e, i) =>
          (i === selectedRecipe.cuisines.length - 1)? acc + e : acc + e + ", ", "")}</h4>
        <h4>{"Preperation Time: " + selectedRecipe.readyInMinutes + " min"}</h4>
        <h4>{"Serves " + selectedRecipe.servings}</h4>
        <h5>{"Ingredient Quantities: " + selectedRecipe.extendedIngredients.map(ing => 
        "     " + ing.measures.us.amount + " " + ing.measures.us.unitShort + " " + ing.name
        )}</h5>
        <h5>{selectedRecipe.instructions}</h5>
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
