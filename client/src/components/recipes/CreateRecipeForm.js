import React, {useState} from 'react'
import axios from 'axios'

const CreateRecipeForm = (props) => {
  const [recipe, setRecipe] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')
  const [imgPreview, setImgPreview] = useState(null)
  const [imageError, setImageError] = useState(false)

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

  const handleClose = () => {
    setRecipe('')
    setIngredient('')
    setIngredients([])
    setMethod('')
    props.closeForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('recipe', recipe)
    formData.append('ingredients', ingredients)
    formData.append('method', method)

  }

  const handleImageChange = (e) => {
    const selected = e.target.files[0]
    const ALLOWED_TYPES = ['image/jpg', 'image/png', 'image/jpeg']

    if(selected && ALLOWED_TYPES.includes(selected.type)) {
      setImageError(false)

      let reader = new FileReader()

      reader.onloadend = () => {
        setImgPreview(reader.result)
      }
      reader.readAsDataURL(selected)

    } else {
      setImageError(true)
    }
  }

  let background

  if(!imgPreview) {
    background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
  } else {
    background = {
      background: `url("${imgPreview}") no-repeat`,
      backgroundSize: "cover",
      backgroundPosition: "50%"
    }
  }

  return(
    <section className="fullcard-container p-3">
      <div className="fullcard rounded shadow-lg m-auto mt-3">
        <div className="recipe-image rounded-top position-relative" style={background}>
          
          <div className="card-buttons d-flex justify-content-end">
            <button 
                className="card-button rounded-circle shadow"
                onClick={() => handleClose()}
              ><i className="fas fa-times"></i>
            </button>
          </div>

        </div>

        <form className="p-4" encType="multipart/form-date">
          <div className="custom-form-group d-flex flex-column w-100 m-auto mb-4">
            <label className="mb-1">Name of recipe</label>
            <input 
              className="input pt-1 px-2 pb-2"
              type="text"
              placeholder="Recipe"
              value={recipe}
              onChange={(e) => {setRecipe(e.target.value)}}
            />
          </div>

          <div className="custom-form-group d-flex flex-column w-100 m-auto mb-4">
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

          <div className="custom-form-group d-flex flex-column w-100 m-auto mb-4">
            <label className="mb-1">Directions</label>
            <textarea 
              className="input textarea pt-1 px-2 pb-2"
              type="text"
              placeholder="Cook up a storm"
              value={method}
              onChange={(e) => {setMethod(e.target.value)}}
            />
          </div>

          <div className="custom-form-group d-flex flex-column align-items-center w-100 m-auto mb-2">

            {!imgPreview ? 
              <label className="upload-btn cursor d-flex align-items-center justify-content-center" htmlFor="imgUpload">
                <span className="text-info">Upload Image</span>
              </label>
              :
              <label 
                className="upload-btn cursor d-flex align-items-center justify-content-center"
                onClick={() => setImgPreview(null)}
              >
                <span className="text-danger">Change Image</span>
              </label>
            }

            <input 
              id="imgUpload"
              className="d-none"
              type="file"
              onChange={handleImageChange}
            />
            {imageError && <p className="text-danger mt-2 text-center">File type is not supported</p>}
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreateRecipeForm
