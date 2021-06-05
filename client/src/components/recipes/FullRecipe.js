import React from 'react'

const FullRecipe = (props) => {
  const {recipe, ingredients, method, img} = props.details
  const visible = props.show

  let background

  if (img === "") {
    background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
  }

  let list

  if(ingredients !== undefined) {
    list = ingredients.map(ingredient => {
      return <li>{ingredient}</li>
    })
  }

  return (
    <section className={`fullcard-container p-3 ${!visible ? "d-none" : "d-flex justify-content-center align-items-center"}`} >
      <button 
        className="btn btn-dark rounded-circle close-card-btn"
        onClick={() => props.closeCard()}
      ><i className="fas fa-times"></i></button>
      
      <div className="fullcard rounded shadow-lg">
        <div className="recipe-image rounded-top" style={background}>
        </div>

        <div>
          Stuff goes in here

        </div>        
      </div>
    </section>
  )
}

export default FullRecipe
