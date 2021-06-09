import React, {useState} from 'react'

const CreateRecipeForm = () => {
  const [recipe, setRecipe] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')

  const handleAddIngredient = () => {
    setIngredients((prevState) => {
      return [...prevState, ingredient]
    })
    
    setIngredient('')
  }

  const handleRemoveIngredient = (key) => {
    const filtered = ingredients.filter((ingredient, index) => {
      return index !== key
    })

    setIngredients(filtered)
  }

  let listIngredients = ingredients.map((ingredient, index) => {
    return <li className="d-flex justify-content-between align-items-center" key={index}>{ingredient} 
      <i 
        className="fa fa-trash cursor"
        onClick={() => handleRemoveIngredient(index)}
      ></i>
    </li>
  })

  return(
    <section className="fullcard-container p-3 d-flex justify-content-center align-items-center">
      <div className="fullcard rounded shadow-lg">
        <h3>Create a recipe</h3>

        <form>
          <div className="custom-form-group d-flex flex-column w-75 m-auto mb-4">
            <label className="mb-1">Name of recipe</label>
            <input 
              className="input pt-1 px-2 pb-2"
              type="text"
              placeholder="Recipe"
              value={recipe}
              onChange={(e) => {setRecipe(e.target.value)}}
            />
          </div>

          <div className="custom-form-group d-flex flex-column w-75 m-auto mb-4">
            <label className="mb-1">Add ingredients</label>

            {ingredients.length > 0 
            ? <ul>{listIngredients}</ul>
            : ''}

            <div className="position-relative w-100">
              <input 
                className="input pt-1 px-2 pb-2 w-100"
                type="text"
                placeholder="Ingredient"
                value={ingredient}
                onChange={(e) => {setIngredient(e.target.value)}}
              />
              
              <i 
                className="fa fa-plus cursor position-absolute add-ingredient"
                onClick={(e) => handleAddIngredient(e)}
              ></i>
            </div>
            
          </div>

          <div className="custom-form-group d-flex flex-column w-75 m-auto">
            <label className="mb-1">Directions</label>
            <textarea 
              className="input textarea pt-1 px-2 pb-2"
              type="text"
              placeholder="Cook up a storm"
              value={method}
              onChange={(e) => {setMethod(e.target.value)}}
            />
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreateRecipeForm
