import React from 'react'

const Header = (props) => {
  return(
    <header className="w-100 p-4 text-center">
      <h1>{props.user}'s Recipes</h1>
    </header>
  )
}

export default Header
