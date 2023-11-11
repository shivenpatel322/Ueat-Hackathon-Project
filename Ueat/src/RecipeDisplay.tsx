import React, {} from 'react';
import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  // Add any other properties you expect in the response
}
interface RecipeDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  sharedVariable: number;
  setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({setDisplay,sharedVariable}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const apikey = '1c0f21a9b3204a0e925be4151a81bb9e';

  const getRecipeInfo = async (id: number) => {

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apikey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showSelectedRecipe = () => {
    getRecipeInfo(sharedVariable);
    if (!selectedRecipe) {
      return null;
    }

    return (
      <div>
        <h2>{selectedRecipe.title}</h2>
        <img src={selectedRecipe.image} alt="Recipe" />
        {/* Add other details as needed */}
      </div>
    );
  };
 return (
 <div>
  <button onClick={() => setDisplay(true)}>{sharedVariable}</button>
  {showSelectedRecipe()}
 </div>);
}

export default RecipeDisplay;
