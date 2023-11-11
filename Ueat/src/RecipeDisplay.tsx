import React, {} from 'react';
//import {id} from './RecipeFinder';

interface RecipeDisplayProps {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  sharedVariable: number;
  setSharedVariable: React.Dispatch<React.SetStateAction<number>>;
}

//const number = id;
const RecipeDisplay: React.FC<RecipeDisplayProps> = ({setDisplay,sharedVariable}) => {
 return (<div><button onClick={() => setDisplay(true)}>{sharedVariable}</button></div>);
}

export default RecipeDisplay;
