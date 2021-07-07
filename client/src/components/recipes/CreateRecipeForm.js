import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from '../global/Button'
import GetIngredients from '../global/GetIngredients'
import { useSpring, animated } from 'react-spring'
import { useMeasure } from 'react-use'

const CreateRecipeForm = (props) => {
  const [recipe, setRecipe] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')
  const [fileName, setFileName] = useState('')
  const [imgPreview, setImgPreview] = useState(null)
  const [imageError, setImageError] = useState(false)

  const defaultHeight = '10px'
  const [open, toggle] = useState(false)
  const [contentHeight, setContentHeight] = useState(defaultHeight)
  const [ref, {height}] = useMeasure()

  const expand = useSpring({
    config: {friction: 20},
    height: open ? `${contentHeight}px` : defaultHeight
  })

  useEffect(() => {
    setContentHeight(height)

    window.addEventListener("resize", setContentHeight(height))

    return window.removeEventListener("resize", setContentHeight(height))
  }, [height])

  useEffect(() => {
    if(ingredients.length > 0) {
      toggle(true)
    } else {
      toggle(false)
    }
  }, [ingredients])

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

  const handleClose = () => {
    setRecipe('')
    setIngredient('')
    setIngredients([])
    setMethod('')
    setFileName('')
    setImgPreview(null)
    setImageError(false)
    props.closeForm()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()

    formData.append('recipe', recipe)
    formData.append('ingredients', JSON.stringify(ingredients))
    formData.append('method', method)
    formData.append('img', fileName)

    axios.post('http://localhost:3001/recipe/create', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      props.addRecipe(res.data.data)
      handleClose()
    })
    .catch(err => {
      console.log(err)
    })

  }

  const handleImageChange = (e) => {
    setFileName(e.target.files[0])
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

  const getStyle = () => {
    let background

    if(!imgPreview) {
      background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
    } else {
      background = {
        background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, .85) 100%), url("${imgPreview}") no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "50%"
      }
    }

    return background
  }

  return(
    <div className="fullcard rounded shadow-lg m-auto mt-3">
      <div className="recipe-image rounded-top position-relative" style={getStyle()}>
        
        <div className="card-buttons d-flex justify-content-end">
          <Button
            handleClick={handleClose}
            buttonType={'icon-dark'}
            text={<i className="fas fa-times"></i>}
            disable={false} 
          />
        </div>

      </div>

      <form className="p-4" encType="multipart/form-date" onSubmit={(e) => handleSubmit(e)}>
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

          <animated.div style={expand}>
            <ul ref={ref} style={{overflowY: 'hidden'}}>
              <GetIngredients 
                ingredients={ingredients}
                handleRemoveIngredient={handleRemoveIngredient}
              />
            </ul>
          </animated.div>


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

        <div className="custom-form-group d-flex flex-column align-items-center w-100 m-auto mb-4">

          {!imgPreview ? 
            <label className="upload-btn cursor d-flex align-items-center justify-content-center" htmlFor="imgUpload">
              <span className="text-info">Upload Image</span>
            </label>
            :
            <label 
              className="upload-btn cursor d-flex align-items-center justify-content-center"
              htmlFor="imgUpload"
              onClick={() => setImgPreview(null)}
            >
              <span className="text-danger">Change Image</span>
            </label>
          }
          <input 
            id="imgUpload"
            className="d-none"
            type="file"
            filename="img"
            onChange={handleImageChange}
          />
          {imageError && <p className="text-danger mt-2 text-center">File type is not supported</p>}
        </div>

        <div className="w-100 text-center">
          <Button
            handleClick={handleSubmit}
            buttonType={'icon-green'}
            text={<i className="fas fa-check"></i>}
            disable={false} 
          />
        </div>

      </form>
    </div>
  )
}

export default CreateRecipeForm
