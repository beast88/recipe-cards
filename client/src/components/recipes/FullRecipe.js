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
    <section className={`fullcard-container p-3 ${!visible ? "d-none" : "d-block"}`} >
      
      <div className="fullcard rounded shadow-lg m-auto mt-3">
        <div className="recipe-image rounded-top position-relative" style={background}>
          <div className="card-buttons d-flex justify-content-between">
            <button
              className="card-button rounded-circle"
            ><i className="far fa-edit"></i></button>

            <button 
              className="card-button rounded-circle"
              onClick={() => props.closeCard()}
            ><i className="fas fa-times"></i></button>
          </div>
        </div>

        <div className="p-4">
          <h4>{recipe}</h4>
          <hr></hr>
          <ul>
            {list}
          </ul>
          <hr></hr>
          {method}

        </div>        
      </div>
    </section>
  )
}

export default FullRecipe
