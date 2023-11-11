import { useState } from 'react'
import './App.css'
import Welcome from "./Welcome";
import Ingredients from "./Ingredients";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
    <div className="App">
      {loggedIn ? (
        <Ingredients setLoggedIn={setLoggedIn} />
      ) : (
        <Welcome setLoggedIn={setLoggedIn} />
      )}
    </div>
    </>
  )
}

export default App
