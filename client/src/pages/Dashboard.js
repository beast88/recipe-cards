import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../components/dashboard/Header'
import RecipeCard from '../components/recipes/RecipeCard'
import Interface from '../components/recipes/Interface'

const Dashboard = () => {
  const [user, setUser] = useState('')
  const [recipes, setRecipes] = useState([])

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

  return(
    <div className="dashboard-container vh-100 vw-100">
      <Header user={user} />

      <div className="d-flex mx-auto justify-content-around">
        {recipes.map(card => {
          return <RecipeCard recipe={card} key={card._id} />
        })}
      </div>

      <Interface />  
    </div>
  )
}

export default Dashboard