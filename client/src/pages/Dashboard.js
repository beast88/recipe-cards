import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from '../components/dashboard/Header'
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

      <Interface />  
    </div>
  )
}

export default Dashboard