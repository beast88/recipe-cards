import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/dashboard/Header'
import RecipeCard from '../components/recipes/RecipeCard'
import Interface from '../components/recipes/Interface'
import RecipeContainer from '../components/recipes/RecipeContainer'
import { useTransition, animated } from 'react-spring'

const Dashboard = () => {
  const [user, setUser] = useState('')
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [showRecipe, setShowRecipe] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showContainer, setShowContainer] = useState(false)

  const fadeIn = useTransition(showContainer, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  })

  useEffect(() => {
    axios.get('/recipe/read', {
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
    setShowContainer(true)
    setShowRecipe(true)
  }

  const handleEdit = () => {
    setShowRecipe(false)
    setShowEdit(true)
  }

  const closeCard = () => {
    setShowRecipe(false)
    setShowContainer(false)
  }

  const renderForm = () => {
    setShowContainer(true)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setShowContainer(false)
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
    setShowContainer(false)
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
        renderForm={renderForm}
      />

      {
        fadeIn((styles, item) =>
          item && <animated.section className="fullcard-container p-3" style={styles}>
            <RecipeContainer
              selectedRecipe={selectedRecipe}
              showRecipe={showRecipe}
              handleEdit={handleEdit}
              closeCard={closeCard}
              handleDelete={handleDelete}
              showEdit={showEdit}
              handleEditRecipe={handleEditRecipe}
              closeEditForm={closeEditForm}
              showForm={showForm}
              addRecipe={addRecipe}
              closeForm={closeForm}
            />
        </animated.section>
        )
      }
    </div>
  )
}

export default Dashboard