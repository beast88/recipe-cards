import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../components/dashboard/Header'
import RecipeCard from '../components/recipes/RecipeCard'
import FullRecipe from '../components/recipes/FullRecipe'
import Interface from '../components/recipes/Interface'
import CreateRecipeForm from '../components/recipes/CreateRecipeForm'
import EditRecipeForm from '../components/recipes/EditRecipeForm'

const Dashboard = () => {
  const [user, setUser] = useState('')
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [showRecipe, setShowRecipe] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/recipe/read', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      setRecipes(res.data.data)
      setUser(res.data.user)
    })
    .catch(err => {
      window.location.href = '/'
    })
  }, [])

  const handleSelect = (id) => {
    const selected = recipes.find(recipe => {
      return recipe._id === id
    })

    setSelectedRecipe(selected)
    setShowRecipe(true)
  }

  const handleEdit = () => {
    setShowRecipe(false)
    setShowEdit(true)
  }

  const closeCard = () => {
    setShowRecipe(false)
  }

  const closeForm = () => {
    setShowForm(false)
  }

  const closeEditForm = () => {
    setShowEdit(false)
    setShowRecipe(true)
  }

  const addRecipe = (recipe) => {
    setRecipes(prevState => {
      return [...prevState, recipe]
    })
  }

  const handleDelete = (id) => {
    const filtered = recipes.filter(recipe => {
      return recipe._id !== id
    })

    setRecipes(filtered)
    setSelectedRecipe({})
    setShowRecipe(false)
  }

  const handleEditRecipe = (updatedRecipe) => {
    const id = updatedRecipe._id
    const updatedRecipes = recipes.map(recipe => {
      return recipe._id === id ? updatedRecipe : recipe
    })

    setRecipes(updatedRecipes)
    setSelectedRecipe(updatedRecipe)
    closeEditForm() 
  }

  return(
    <div>
      <div className="dashboard-container vw-100">
        <Header user={user} />

        <div className="d-flex mx-auto justify-content-around flex-wrap">
          {recipes.map(card => {
            return <RecipeCard 
              recipe={card} 
              key={card._id}
              handleSelect={handleSelect}        
            />
          })}
        </div>
      </div>

      <Interface 
          renderCreateForm={() => {setShowForm(true)}}
        />

      {showRecipe && <FullRecipe 
        details={selectedRecipe} 
        closeCard={closeCard}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />}

      {showForm && <CreateRecipeForm
        closeForm={closeForm}
        addRecipe={addRecipe}
      />}

      {showEdit && <EditRecipeForm 
        selectedRecipe={selectedRecipe}
        closeEditForm={closeEditForm}
        handleEditRecipe={handleEditRecipe}
      />}
    </div>
  )
}

export default Dashboard