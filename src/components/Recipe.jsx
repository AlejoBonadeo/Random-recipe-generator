import { useEffect, useRef } from "react"

const Recipe = ({ recipe, loading, error }) => {

    const instructionsRef = useRef()

    useEffect(() => {
        if(!loading && !error) {
            instructionsRef.current.innerHTML = recipe.instructions
        }
    }, [ recipe, instructionsRef, loading ])
    
    if(error) {
        return (
          <div className="recipe">
            <h1>Oops! Something went wrong</h1>
            <h4>Seems that my free api key ran out. You can try again tomorrow.</h4>
          </div>
        )
      }

    if(loading) {
        return (
            <div className="recipe">
                <h1>Loading...</h1>
            </div>
            )
    }

    return (
        <div className="recipe">
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt="" />
            <h3>Ingredients</h3>
            <ul>
                {
                    recipe.extendedIngredients.map(ingredient => (
                        <li>{ingredient.originalString}</li>
                    ))
                }
            </ul>
            <h3>Preparation</h3>
            <div ref={ instructionsRef }></div>
        </div >
    )
}


export default Recipe

