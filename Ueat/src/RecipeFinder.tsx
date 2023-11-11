import React, { useState } from 'react';


interface RecipeDisplayProps {
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    sharedVariable: number;
    setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
  }
interface Recipe {
  id: number;
  title: string;
  image: string;
  // Add any other properties you expect in the response
}
const RecipeFinder: React.FC<RecipeDisplayProps> = ({ setDisplay,setSharedVariable }) => {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const apikey = '1c0f21a9b3204a0e925be4151a81bb9e';

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
      <div className="card" style={{ width: '18rem' }}>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <img
              className="card-img-top"
              src={recipe.image}
              onClick={() => {setSharedVariable(recipe.id);setDisplay(false);}}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
            </div>
          </div>
        ))}
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
      </div>
    </div>
  );
};
export default RecipeFinder;
