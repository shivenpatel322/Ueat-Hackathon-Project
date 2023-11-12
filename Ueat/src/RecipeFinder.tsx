import React, { useState } from 'react';
import Ingredients from './Ingredients';

interface RecipeDisplayProps {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    sharedVariable: number;
    setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
  }
interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
  missedIngredients: Ingredients[];
  usedIngredientCount: number;
  unusedIngredients: Ingredients[];
  // Add any other properties you expect in the response
}
interface Ingredients {
  name: string;
}
export let id = 0;
export function sendID(idNumber: number){
    id = idNumber;
}
const RecipeFinder: React.FC<RecipeDisplayProps> = ({ setDisplay,setSharedVariable }) => {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false); // New state for loading recipe information
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const apikey = 'f7747b08130e41e0b9628561ab6afd31';

  const getRecipeInfo = async (id: number) => {
    setLoadingInfo(true); // Set loading for recipe information
    setError(null);

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apikey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingInfo(false); // Reset loading for recipe information
    }
  };

  const getRecipe = async (value: string) => {
    setLoading(true);
    setError(null);

    const valueArray = value.split(',');
    const trimmedArray = valueArray.map((ingredient) => ingredient.trim());
    const newValue = trimmedArray.join(',');

    const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apikey}&ingredients=${newValue}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showRecipe = () => {
    if (loading) {
      return <h4>Loading...</h4>;
    }

    if (error) {
      return <h4 style={{ color: 'red' }}>{error}</h4>;
    }

    if (recipes.length === 0) {
      return <h4 style={{ color: 'red' }}>No match found in our database</h4>;
    }

    return (
      <div className="card">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h4 onClick={() => getRecipeInfo(recipe.id)}className="card-title">{recipe.title}</h4>
            <img
              className="card-img-top"
              src={recipe.image}
              onClick={() => {setSharedVariable(recipe.id);sendID(recipe.id);console.log(id);}}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-match">{"Matching Ingredients: " + Math.floor(recipe.usedIngredientCount / (recipe.missedIngredientCount + recipe.usedIngredientCount + recipe.unusedIngredients.length) * 100) + "%"}</h5>
              <h5 className="card-missingFridge">{"Missing Recipe Ingredients: " + recipe.missedIngredients.map(ing => "     " + ing.name)}</h5>
              <h5 className="card-missingFridge">{"Missing Input Ingredients: " + 
              (recipe.unusedIngredients.length == 0)? "No unused ingredients" : recipe.unusedIngredients.map(ing =>  "     " + ing.name)}</h5>
            </div>
          </div>
        ))}
      </div>
    );
  };


  const showSelectedRecipe = () => {
    if (!selectedRecipe) {
      return null;
    }

    return (
      <div>
        <h2>{selectedRecipe.title}</h2>
        <img src={selectedRecipe.image} alt="Recipe" />
      </div>
    );
  };


  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const search = inputValue.toLowerCase();
    getRecipe(search);
  };

  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Enter Ingredients (comma-separated):</label>
        <input
          type="text"
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Search</button>
        <button onClick={() => setDisplay(false)}> To Display</button>
      </form>

      <div id="results">
        {showRecipe()}
        {loadingInfo && <h4>Loading recipe information...</h4>}
        {showSelectedRecipe()}
      </div>
    </div>
  );
};
export default RecipeFinder;
