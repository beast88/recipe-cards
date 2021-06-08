import React from 'react'

const RecipeCard = (props) => {
  const {recipe, img, _id} = props.recipe

  let background

  if (img === "") {
    background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
  }

  return(
    <div 
      className="recipe-card p-3 d-flex align-items-end cursor mb-4 mx-1 shadow" 
      style={background}
      onClick={() => props.handleSelect(_id)}
    >
      <h2 className="text-white">{recipe}</h2>
    </div>
  )
}

export default RecipeCard
