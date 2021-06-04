import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../components/dashboard/Header'
import RecipeCard from '../components/recipes/RecipeCard'
import FullRecipe from '../components/recipes/FullRecipe'
import Interface from '../components/recipes/Interface'

const Dashboard = () => {
  const [user, setUser] = useState('')
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [showRecipe, setShowRecipe] = useState(false)

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

  const closeCard = () => {
    setShowRecipe(false)
  }

  return(
    <div className="dashboard-container vh-100 vw-100">
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

      <Interface />

      <FullRecipe 
        details={selectedRecipe} 
        show={showRecipe}
        closeCard={closeCard}
      />
    </div>
  )
}

export default Dashboard