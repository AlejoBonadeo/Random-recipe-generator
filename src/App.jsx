import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Recipe from "./components/Recipe";

function App() {

  const [vegetarian, setVegetarian] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(false)

  const handleVegetarianChange = e => {
    setVegetarian(e.target.checked)
  }

  const handleVeganChange = e => {
    setVegan(e.target.checked)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const tags = vegan ? '&tags=vegan' : vegetarian ? '&tags=vegetarian' : ''
      const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=83fa99e66b394960a7e4a5a461f8fdeb&number=1' + tags)
      const data = await response.json()
      const { recipes } = data
      const [ recipe ] = recipes
      setRecipe(recipe)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="title">
        <h1>What does my girlfriend want to eat today?</h1>
        <h4>She doesn't know(obviously)</h4>
        <Button 
        variant="contained" 
        size="large" 
        onClick={ handleSubmit }
        >
          Get Meal Ideas
        </Button>
        <div className="form-group">
          <FormControlLabel 
          control={
            <Checkbox
            checked={vegetarian}
            onChange={handleVegetarianChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />} 
          label="vegetarian"
          />
          <FormControlLabel 
          control={
            <Checkbox
            checked={vegan}
            onChange={handleVeganChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />} 
          label="vegan"
          />
        </div>
      </div>
      {
      (recipe || error) && <Recipe recipe={recipe} loading={loading} error={error}/>
      }
    </div>
  );
}

export default App;
