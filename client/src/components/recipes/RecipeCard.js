import React from 'react'

const RecipeCard = (props) => {
  const {recipe, img} = props.recipe

  let background

  if (img === "") {
    background = {background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(15,57,37,0.8) 30%, rgba(25,135,84,1) 100%)'}
  }

  return(
    <div className="recipe-card p-3 d-flex align-items-end cursor" style={background}>
      <h2 className="text-white">{recipe}</h2>
    </div>
  )
}

export default RecipeCard