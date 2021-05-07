import React from 'react'

const RequireAuth = (Component) => {
  return(props) => {
    const token = localStorage.getItem('token')

    if(!token){
      window.location.href = '/'
    }

    return <Component {...props} />
  }
}

export default RequireAuth